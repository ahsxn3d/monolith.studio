import prisma from "@/lib/prisma";
import { LeadStatusActions } from "@/components/LeadStatusActions";

export const dynamic = "force-dynamic";

export default async function ConsultationsPage() {
  const consultations = await prisma.lead.findMany({
    where: { type: "CONSULTATION" },
    orderBy: { created_at: "desc" }
  });

  return (
    <div className="p-4 md:p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500 mb-2">
          Consultations
        </h1>
        <p className="text-[#D946EF] font-mono tracking-widest uppercase text-xs">
          Aether Intelligence Center // Incoming Requests
        </p>
      </header>

      <div className="bg-slate-900/10 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(217,70,239,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-fuchsia-900/20 backdrop-blur-md border-b border-fuchsia-500/20 text-xs font-mono tracking-wider uppercase text-fuchsia-200">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Scheduled Date</th>
                <th className="p-4">Scheduled Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {consultations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-mono text-sm">
                    No consultations found.
                  </td>
                </tr>
              ) : (
                consultations.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-medium text-white">{lead.client_name}</td>
                    <td className="p-4 text-slate-400">{lead.client_email}</td>
                    <td className="p-4 text-emerald-400 font-mono">{lead.scheduled_date ? lead.scheduled_date.toLocaleDateString() : "N/A"}</td>
                    <td className="p-4 text-emerald-400 font-mono">{lead.scheduled_time || "N/A"}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border ${
                        lead.status === 'DONE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        lead.status === 'CANCELLED' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 flex justify-end">
                      <LeadStatusActions id={lead.id} currentStatus={lead.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
