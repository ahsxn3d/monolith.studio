import prisma from "@/lib/prisma";
import { LeadStatusActions } from "@/components/LeadStatusActions";

export const dynamic = "force-dynamic";

export default async function CallsPage() {
  const calls = await prisma.lead.findMany({
    where: { type: "CALL" },
    orderBy: { created_at: "desc" }
  });

  return (
    <div className="p-4 md:p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500 mb-2">
          Booked Calls
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
              {calls.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-mono text-sm">
                    No booked calls found.
                  </td>
                </tr>
              ) : (
                calls.map((lead: any) => (
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
                    <td className="p-4 flex justify-end gap-2 items-center">
                      <a
                        href={`mailto:${lead.client_email}?subject=Invoice:%20Custom%20Web%20Development%20Project&body=Hello%20${encodeURIComponent(lead.client_name)},%0D%0A%0D%0AIt%20was%20great%20discussing%20your%20project.%20The%20total%20investment%20for%20your%20custom%20build%20is%20${lead.total_cost ? `$${lead.total_cost}` : 'TBD'}.%0D%0A%0D%0AYou%20can%20securely%20complete%20your%20payment%20using%20Mastercard/Visa%20via%20this%20official%20Payoneer%20checkout%20link:%20[INSERT_PAYONEER_LINK_HERE]%0D%0A%0D%0AOnce%20the%20payment%20clears,%20we%20will%20immediately%20begin%20production.%0D%0A%0D%0ABest%20regards,%0D%0AAhsan`}
                        className="px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase border bg-blue-900/40 text-blue-300 border-purple-500/40 hover:bg-blue-800/60 transition-all shadow-[0_0_15px_rgba(59,130,246,0.15)] whitespace-nowrap"
                      >
                        Send Invoice: Payoneer
                      </a>
                      <a
                        href={`mailto:${lead.client_email}?subject=Invoice:%20Custom%20Web%20Development%20Project&body=Hello%20${encodeURIComponent(lead.client_name)},%0D%0A%0D%0AIt%20was%20great%20discussing%20your%20project.%20The%20total%20investment%20for%20your%20custom%20build%20is%20${lead.total_cost ? `$${lead.total_cost}` : 'TBD'}.%0D%0A%0D%0AYou%20can%20securely%20complete%20your%20payment%20using%20Apple%20Pay,%20Google%20Pay,%20or%20any%20Global%20Credit%20Card%20via%20this%20official%20SadaPay%20checkout%20link:%20[INSERT_SADAPAY_LINK_HERE]%0D%0A%0D%0AOnce%20the%20payment%20clears,%20we%20will%20immediately%20begin%20production.%0D%0A%0D%0ABest%20regards,%0D%0AAhsan`}
                        className="px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase border bg-teal-900/40 text-teal-300 border-purple-500/40 hover:bg-teal-800/60 transition-all shadow-[0_0_15px_rgba(20,184,166,0.15)] whitespace-nowrap"
                      >
                        Send Invoice: SadaPay
                      </a>
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
