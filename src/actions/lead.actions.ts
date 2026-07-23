"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(id: string, status: string) {
  try {
    await prisma.lead.update({
      where: { id },
      data: { status }
    });

    // Revalidate all admin pages where leads might be shown
    revalidatePath("/admin/estimates");
    revalidatePath("/admin/calls");
    revalidatePath("/admin/consultations");

    return { success: true, message: `Status updated to ${status}` };
  } catch (error: any) {
    console.error("Failed to update status:", error);
    return { success: false, message: error.message || "Failed to update status" };
  }
}
