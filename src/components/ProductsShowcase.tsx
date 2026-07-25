import prisma from "@/lib/prisma";
import { ProductsShowcaseClient } from "./ProductsShowcaseClient";

export default async function ProductsShowcase() {
  const projects = await prisma.project.findMany({
    where: { status: "ACTIVE" }, // Only show active projects
  });

  return (
    <section id="products" className="relative py-10 md:py-24 px-4 md:px-8 max-w-6xl mx-auto z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#D946EF] to-[#c026d3] drop-shadow-[0_0_40px_rgba(217,70,239,0.3)] mb-4">
          Active Deployments
        </h2>
        <p className="text-slate-400 font-mono tracking-widest uppercase text-xs">
          Production Systems Online
        </p>
      </div>

      <ProductsShowcaseClient initialProjects={projects} />
    </section>
  );
}
