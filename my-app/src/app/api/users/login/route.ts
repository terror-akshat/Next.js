import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

    const token_data = {
      id: userExists._id,
      username: userExists.username,
      email: userExists.email,
    };
    const token = await jwt.sign(token_data, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successfully",
      status: 201,
      success: "true",
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
      error: error.message,
    });
  }
}
