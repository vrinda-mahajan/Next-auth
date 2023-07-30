import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { newPassword, token } = reqBody;
    const user = await User.findOne({
      forgetPasswordToken: token,
      forgetPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid token!" }, { status: 400 });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    user.password = hashedPassword;
    user.forgetPasswordToken = undefined;
    user.forgetPasswordTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({
      message: "Password updated successfully!",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
