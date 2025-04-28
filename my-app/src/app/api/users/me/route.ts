import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { stat } from "fs";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user, status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", statusText: error.message },
      { status: 500 }
    );
  }
}
