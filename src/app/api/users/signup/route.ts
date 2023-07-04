import connect from "@/database/config";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// const bcryptjs = require("bcryptjs")

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const addUser = await User.findOne({ email });

    if (addUser) {
      return NextResponse.json(
        { error: "User already exists!" },
        { status: 400 }
      );
    }

    // Hash password
    // const salt = await bcryptjs.salt(10);
    const hashPassword = await bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "Saved user",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.log("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
