import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);

    const { username, email, password } = reqBody;
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const saveUser = await newUser.save();
    if (!saveUser) {
      return NextResponse.json(
        { message: "User not created" },
        { status: 400 }
      );
    }
    // send verification mail
    await sendEmail({ email, emailType: "VERIFY", userId: saveUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      saveUser,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
