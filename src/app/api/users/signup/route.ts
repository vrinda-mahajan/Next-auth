import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { EmailType, sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { error } = validate(reqBody);
    if (error)
      return NextResponse.json(
        { error: "Request body is not valid!" },
        { status: 400 }
      );

    const { username, email, password } = reqBody;
    // checks if user already exists
    const user = await User.findOne({ email });
    if (user)
      return NextResponse.json(
        { error: "User already exists!" },
        { status: 400 }
      );

    // hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // creating new user
    const userToBeSaved = new User({
      username,
      email,
      password: hashedPassword,
    });
    // saving user to db
    const savedUser = await userToBeSaved.save();
    console.log(savedUser);

    await sendEmail({
      email,
      emailType: EmailType.Verify,
      userId: savedUser._id,
    });

    return NextResponse.json(
      { message: "User created successfully!", success: true, savedUser },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

const validate = (user: any) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(4).max(255).required(),
  });

  return schema.validate(user);
};
