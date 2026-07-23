import prisma from "@/lib/prisma";
import { ProjectCatalogClient } from "@/components/ProjectCatalogClient";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { title: "asc" }
  });

  return (
    <div className="py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
          
          <header className="mb-12 border-b border-purple-500/20 pb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2">
                Product Catalog
              </h1>
              <p className="text-pink-500 font-mono tracking-widest uppercase text-xs shadow-sm">
                Level 4 Access // Projects Module
              </p>
            </div>
            
            {/* The primary Add New button is handled in the Client Component because it opens a modal, but we can pass the initial projects array there */}
          </header>

          <ProjectCatalogClient initialProjects={projects} />

      </div>
    </div>
  );
}
