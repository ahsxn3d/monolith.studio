"use server";

import prisma from "@/lib/prisma";

export async function createBooking(prevState: any, formData: FormData) {
  try {
    const client_name = formData.get("name") as string;
    const client_email = formData.get("email") as string;
    const meetingType = formData.get("type") as string;
    const scheduled_date_str = formData.get("scheduled_date") as string;
    const scheduled_time = formData.get("scheduled_time") as string;
    const summary = formData.get("summary") as string;

    if (!client_name || !client_email || !meetingType) {
      return { success: false, error: "Name, email, and meeting type are required." };
    }

    const type = meetingType === "CALL" ? "CALL" : "CONSULTATION";

    const data: any = {
      client_name,
      client_email,
      type,
      status: "PENDING",
      summary,
    };

    if (scheduled_date_str) {
      data.scheduled_date = new Date(scheduled_date_str);
    }
    if (scheduled_time) {
      data.scheduled_time = scheduled_time;
    }

    await prisma.lead.create({ data });

    return { success: true };
  } catch (error: any) {
    console.error("Booking creation failed:", error);
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}
