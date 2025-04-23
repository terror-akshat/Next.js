import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    if (!email || !password) {
      return NextResponse.json({
        message: "Please fill the reuqired details for Login",
      });
    }
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      return NextResponse.json({
        message: "This email is not registerd yet",
        staus: 404,
      });
    }
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Incorrect password", satus: 400 });
    }
    return NextResponse.json({
      message: "Login Successfully",
      status: 201,
      success: "true",
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
      error: error.message,
    });
  }
}
