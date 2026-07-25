import prisma from "@/lib/prisma";

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

      {projects.length === 0 ? (
        <div className="w-full max-w-2xl mx-auto bg-slate-950/30 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-12 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-12 h-12 rounded-full border border-fuchsia-500/50 border-t-fuchsia-500 animate-spin mb-6"></div>
          <h3 className="text-white text-xl font-black mb-2">System initializing...</h3>
          <p className="text-purple-300 font-mono text-sm uppercase tracking-widest">
            Encrypted payloads pending.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-slate-950/30 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden hover:bg-slate-900/40 hover:border-fuchsia-500/50 transition-all duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(217,70,239,0.3)] flex flex-col"
            >
              {/* Thumbnail Container 16:9 */}
              <div className="relative w-full aspect-video bg-black/50 overflow-hidden border-b border-white/10 group-hover:border-fuchsia-500/30 transition-colors">
                {project.thumbnail_url ? (
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-purple-500/30 font-mono text-xs uppercase tracking-widest">
                    No Signal
                  </div>
                )}
                
                {/* Status Badge overlay */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                  <span className="text-[10px] font-mono tracking-widest text-fuchsia-400 uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse"></span>
                    Live
                  </span>
                </div>
              </div>

              <div className="p-4 md:p-8 flex flex-col flex-1">
                <h3 className="text-base md:text-xl font-bold text-white mb-3 tracking-wide">{project.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 mb-6">
                  {project.description || project.purpose}
                </p>
                
                <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase">
                    ${project.total_cost.toLocaleString()}
                  </span>
                  {project.live_url && (
                    <a 
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-fuchsia-400 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1"
                    >
                      Initialize ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
