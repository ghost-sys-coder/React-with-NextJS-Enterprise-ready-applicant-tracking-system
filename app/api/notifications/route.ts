import { NextResponse, NextRequest } from "next/server";
import { sendContactFormEmails } from "@/lib/notifications";
import connectToMongoDB from "@/lib/mongo";

export async function POST(req: NextRequest) {
 
  //  connect to mongodb
  await connectToMongoDB();
  const { firstName, lastName, email, subject, message } = await req.json();

  // Validate the input data
  if (!firstName || !lastName || !email || !subject || !message) {
    return NextResponse.json(
      {
        success: false,
        message:
          "All fields are required. Please fill out the form completely.",
      },
      { status: 400 }
    );
  }

  // Check if the email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid email address. Please enter a valid email.",
      },
      { status: 404 }
    );
  }

  const formData = { firstName, lastName, email, subject, message };

  try {
    const { ownerNotification, clientAutoReply } = await sendContactFormEmails(
      formData
    );

    // check if both notifications were sent successfully
    if (ownerNotification.success && clientAutoReply.success) {
      return NextResponse.json(
        {
          success: true,
          message:
            "Thank you for your message! We've sent you a confirmation email.",
          emailResults: {
            ownerNotification,
            clientAutoReply,
          },
        },
        { status: 200 }
      );
    } else {
      // Handle partial errors
      const errorMessages = [];
      if (!ownerNotification.success) {
        errorMessages.push(
          "Owner notification failed:",
          ownerNotification.error
        );
      }
      if (!clientAutoReply.success) {
        errorMessages.push("Client auto-reply failed:", clientAutoReply.error);
      }

      return NextResponse.json(
        {
          success: false,
          message: "Message received, but there was an issue with delivery",
          errors: errorMessages,
          emailResults: {
            ownerNotification,
            clientAutoReply,
          },
        },
        { status: 207 }
      ); // 207 Multi-Status
    }
  } catch (error) {
    console.log("Internal Server Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
