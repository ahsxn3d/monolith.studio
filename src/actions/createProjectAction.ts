'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Call this function inside your form's onSubmit or action handler
export async function createProjectAction(formData: FormData, uploadThingUrl: string) {
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const purpose = formData.get('purpose') as string
  const audience = formData.get('audience') as string
  const total_cost = parseFloat(formData.get('total_cost') as string) || 0
  const live_url = formData.get('live_url') as string
  const status = (formData.get('status') as string) || 'ACTIVE'
  const category = formData.get('category') as string | null
  const latency = formData.get('latency') as string | null
  const throughput = formData.get('throughput') as string | null
  const tech_stack = formData.getAll('tech_stack') as string[]
  
  // 1. Save the project to PostgreSQL using Prisma
  await prisma.project.create({
    data: {
      title,
      slug,
      description,
      thumbnail_url: uploadThingUrl, 
      purpose,
      audience,
      total_cost,
      live_url,
      status,
      category,
      latency,
      throughput,
      tech_stack,
    }
  })

  // 2. Nuke the Next.js cache so the new project appears instantly
  revalidatePath('/admin/projects')
}
