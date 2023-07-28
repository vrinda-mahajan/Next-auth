import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const { error } = validate(reqBody);
    if (error)
      return NextResponse.json(
        { error: "Request body is not valid!" },
        { status: 400 }
      );

    const { email, password } = reqBody;
    const foundUser = await User.findOne({ email });
    console.log(foundUser);
    if (!foundUser) {
      return NextResponse.json(
        {
          error: "User not found!",
        },
        { status: 400 }
      );
    }
    const correctPassword = await bcryptjs.compare(
      password,
      foundUser.password
    );
    console.log(correctPassword);
    if (!correctPassword) {
      return NextResponse.json(
        {
          error: "Password is not correct!",
        },
        { status: 400 }
      );
    }

    const tokenData = {
      id: foundUser._id,
      email: foundUser.email,
      password: foundUser.password,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Login successful!",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

const validate = (user: any) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
};
