"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProject(prevState: any, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const thumbnail_url = formData.get("thumbnail_url") as string;
    const description = formData.get("description") as string;
    const purpose = formData.get("purpose") as string;
    const audience = formData.get("audience") as string;
    const total_cost_str = formData.get("total_cost") as string;
    const live_url = formData.get("live_url") as string;
    const category = formData.get("category") as string;
    const latency = formData.get("latency") as string;
    const throughput = formData.get("throughput") as string;
    const tech_stack = formData.getAll("tech_stack") as string[];

    if (!title || !slug || !thumbnail_url || !description || !purpose || !audience || !total_cost_str || !live_url) {
      return { success: false, message: "All fields are required." };
    }

    const total_cost = parseFloat(total_cost_str);
    if (isNaN(total_cost)) {
      return { success: false, message: "Total cost must be a valid number." };
    }

    const project = await prisma.project.create({
      data: {
        title, slug, thumbnail_url, description, purpose, audience, total_cost, live_url,
        category, latency, throughput, tech_stack
      },
    });

    revalidatePath("/admin");

    return { success: true, message: "Project created successfully!", projectId: project.id };
  } catch (error: any) {
    console.error("Error creating project:", error);
    if (error.code === 'P2002') return { success: false, message: "A project with this slug already exists." };
    return { success: false, message: "An unexpected error occurred while saving." };
  }
}

export async function updateProject(id: string, prevState: any, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const thumbnail_url = formData.get("thumbnail_url") as string;
    const description = formData.get("description") as string;
    const purpose = formData.get("purpose") as string;
    const audience = formData.get("audience") as string;
    const total_cost_str = formData.get("total_cost") as string;
    const live_url = formData.get("live_url") as string;
    const category = formData.get("category") as string;
    const latency = formData.get("latency") as string;
    const throughput = formData.get("throughput") as string;
    const tech_stack = formData.getAll("tech_stack") as string[];

    if (!title || !slug || !thumbnail_url || !description || !purpose || !audience || !total_cost_str || !live_url) {
      return { success: false, message: "All fields are required." };
    }

    const total_cost = parseFloat(total_cost_str);
    if (isNaN(total_cost)) {
      return { success: false, message: "Total cost must be a valid number." };
    }

    await prisma.project.update({
      where: { id },
      data: {
        title, slug, thumbnail_url, description, purpose, audience, total_cost, live_url,
        category, latency, throughput, tech_stack
      },
    });

    revalidatePath("/admin");

    return { success: true, message: "Project updated successfully!" };
  } catch (error: any) {
    console.error("Error updating project:", error);
    if (error.code === 'P2002') return { success: false, message: "A project with this slug already exists." };
    return { success: false, message: "An unexpected error occurred while updating." };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });
    revalidatePath("/admin");
    return { success: true, message: "Project deleted successfully." };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, message: "Failed to delete project." };
  }
}

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { id: "desc" }
    });
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}
