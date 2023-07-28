import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    console.log(userId, "userId");
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "User data found successfully!",
      success: true,
      user
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
