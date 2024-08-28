import connectMongo from "@/lib/config/db";
import Email from "@/lib/models/EmailModel";
import { NextRequest, NextResponse } from "next/server";

const LoadDB = async () => {
  await connectMongo();
};

// Handle POST request - Create a new email
export async function POST(request: NextRequest) {
  await LoadDB(); // Ensure the database is connected

  const formData = await request.formData();
  const emailData = {
    email: `${formData.get("email")}`,
  };

  try {
    // Check if the email already exists in the database
    const existingEmail = await Email.findOne({ email: emailData.email });

    if (existingEmail) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    // If the email does not exist, create a new entry
    await Email.create(emailData);
    return NextResponse.json({ success: true, message: "Email Created" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creating email" },
      { status: 500 }
    );
  }
}

// Handle GET request - Fetch all emails
export async function GET() {
  await LoadDB(); // Ensure the database is connected

  try {
    const emails = await Email.find(); // Get all emails from the database
    return NextResponse.json({ success: true, emails });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching emails" },
      { status: 500 }
    );
  }
}

// Handle DELETE request - Delete an email by ID
export async function DELETE(request: NextRequest) {
  await LoadDB(); // Ensure the database is connected

  const url = new URL(request.url);
  const emailId = url.searchParams.get("id"); // Get the email ID from query parameters

  if (!emailId) {
    return NextResponse.json(
      { success: false, message: "Email ID is required" },
      { status: 400 }
    );
  }

  try {
    const deletedEmail = await Email.findByIdAndDelete(emailId); // Delete the email by ID

    if (!deletedEmail) {
      return NextResponse.json(
        { success: false, message: "Email not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Email Deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error deleting email" },
      { status: 500 }
    );
  }
}
