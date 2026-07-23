import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // 1. Total Revenue from COMPLETED orders
  const revenueAggregation = await prisma.order.aggregate({
    _sum: { total_cost: true },
    where: { status: "COMPLETED" },
  });
  const totalRevenue = revenueAggregation._sum.total_cost || 0;

  // 2. Project Tracker counts
  const activeProjectsCount = await prisma.project.count({
    where: { status: "ACTIVE" },
  });
  const completedProjectsCount = await prisma.project.count({
    where: { status: "COMPLETED" },
  });

  // 3. Recent Orders (Last 5)
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="py-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <header className="mb-12 border-b border-white/10 pb-8">
            <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#D946EF] to-[#c026d3] mb-2 drop-shadow-[0_0_40px_rgba(217,70,239,0.3)]">
              System Telemetry
            </h1>
            <p className="text-slate-400 font-mono tracking-widest uppercase text-xs">
              Level 4 Access // Dashboard
            </p>
          </header>

          {/* Top Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            
            {/* Revenue Metric */}
            <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-slate-950/10 backdrop-blur-sm border border-white/10 shadow-[0_0_50px_rgba(217,70,239,0.15)] flex flex-col justify-center">
              <h4 className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-2">Total Yield (Completed)</h4>
              <p className="text-3xl md:text-5xl font-black text-white">
                ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            {/* Active Projects Metric */}
            <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-slate-950/10 backdrop-blur-sm border border-white/10 shadow-[0_0_50px_rgba(217,70,239,0.15)] flex flex-col justify-center">
              <h4 className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-2">Active Protocols</h4>
              <p className="text-3xl md:text-5xl font-black text-[#D946EF] drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">
                {activeProjectsCount}
              </p>
            </div>

            {/* Completed Projects Metric */}
            <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-slate-950/10 backdrop-blur-sm border border-white/10 shadow-[0_0_50px_rgba(217,70,239,0.15)] flex flex-col justify-center">
              <h4 className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-2">Archived Protocols</h4>
              <p className="text-3xl md:text-5xl font-black text-white">
                {completedProjectsCount}
              </p>
            </div>

          </div>

          {/* Recent Orders Table Area */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-white mb-6 font-mono tracking-wide uppercase">Recent Inbound Transmissions</h3>
            
            <div className="w-full bg-slate-950/10 backdrop-blur-sm border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_0_50px_rgba(217,70,239,0.15)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-fuchsia-500/20 bg-fuchsia-900/20 backdrop-blur-md">
                      <th className="p-6 text-xs font-mono text-fuchsia-200 uppercase tracking-widest font-normal">Entity Name</th>
                      <th className="p-6 text-xs font-mono text-fuchsia-200 uppercase tracking-widest font-normal">Classification</th>
                      <th className="p-6 text-xs font-mono text-fuchsia-200 uppercase tracking-widest font-normal">Briefing</th>
                      <th className="p-6 text-xs font-mono text-fuchsia-200 uppercase tracking-widest font-normal">Status</th>
                      <th className="p-6 text-xs font-mono text-fuchsia-200 uppercase tracking-widest font-normal text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {recentOrders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-600 font-mono text-sm">No transmissions detected.</td>
                      </tr>
                    ) : (
                      recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-white/[0.02] transition-colors duration-300 group">
                          <td className="p-6 text-white font-medium">{order.client_name}</td>
                          <td className="p-6 text-slate-400 font-mono text-xs">{order.order_type}</td>
                          <td className="p-6 text-slate-400 text-sm max-w-xs truncate" title={order.project_details}>
                            {order.project_details}
                          </td>
                          <td className="p-6">
                            <span className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase rounded-full border ${
                              order.status === 'COMPLETED' ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' :
                              order.status === 'PENDING' ? 'border-fuchsia-500/50 text-[#D946EF] bg-fuchsia-500/10 shadow-[0_0_10px_rgba(217,70,239,0.2)]' :
                              'border-amber-500/50 text-amber-400 bg-amber-500/10'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-6 text-right text-slate-500 font-mono text-xs">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
  );
}
