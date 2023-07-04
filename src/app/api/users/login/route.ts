import connect from "@/database/config";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist!" },
        { status: 400 }
      );
    }

    // Hash password
    // const salt = await bcryptjs.salt(10);
    const validPassword = await bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password!" }, { status: 401 });
    }

    // Create Token
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };


    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Login successfull!",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    console.log("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
