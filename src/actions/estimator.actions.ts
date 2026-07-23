"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitEstimate(payload: any) {
  try {
    const data = {
      client_name: payload.client_name,
      client_email: payload.client_email,
      selected_features: payload.selected_features,
      total_cost: String(payload.total_cost),
      type: "ESTIMATE",
      status: "PENDING",
    };

    await prisma.lead.create({
      data,
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/estimates");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving lead:", error);
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}
