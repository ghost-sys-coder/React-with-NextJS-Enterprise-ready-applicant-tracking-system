import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToMongoDB from "@/lib/mongo";
import UserModel from "@/models/user.model";


export async function POST(req: NextRequest) {
    // protect backend route
    await auth.protect();
    // await mongodb connection
    await connectToMongoDB();

    const { firstName, lastName, email, imageUrl } = await req.json();

    if (!firstName || !lastName || !email) {
        return NextResponse.json({ success: false, message: "All fields are required!" }, {status: 400});
    }

    try {
        const checkUser = await UserModel.findOne({ email });

        if (checkUser) return NextResponse.json({ success: true, message: "User already exists!" }, { status: 200 });

        await UserModel.create({
            firstName,
            lastName,
            email,
            imageUrl
        });

        return NextResponse.json({ success: true, message: "User has been saved!" }, { status: 201 });
    } catch (error) {
        console.log("Something went wrong!", error); 
    }

    return NextResponse.json({ success: true, message: "Successful" }, { status: 200 });
}