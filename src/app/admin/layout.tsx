import React from "react";
import Link from "next/link";
import { LayoutDashboard, FolderKanban, LogOut, Calculator, PhoneCall, MessageSquare } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.email !== "ahsxn3d@gmail.com") {
    redirect("/");
  }

  return (
      <div className="min-h-[100dvh] bg-[url('/assets/hero-bg.jpeg?v=2')] bg-cover bg-center bg-fixed text-white flex relative">
        <div className="relative z-10 flex w-full h-[100dvh] overflow-hidden p-6 gap-6">
          {/* Sidebar Navigation */}
          <aside className="w-64 bg-slate-950/10 backdrop-blur-sm border border-white/10 rounded-2xl flex-col hidden md:flex overflow-hidden shadow-[0_0_30px_rgba(217,70,239,0.1)]">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D946EF] animate-pulse shadow-[0_0_10px_rgba(217,70,239,0.8)]"></span>
                Admin
              </h2>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              <Link 
                href="/admin/dashboard" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <LayoutDashboard size={18} />
                <span className="font-medium text-sm">Dashboard</span>
              </Link>
              <Link 
                href="/admin/projects" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <FolderKanban size={18} />
                <span className="font-medium text-sm">Project Catalog</span>
              </Link>
              <Link 
                href="/admin/estimates" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <Calculator size={18} />
                <span className="font-medium text-sm">Estimates</span>
              </Link>
              <Link 
                href="/admin/calls" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <PhoneCall size={18} />
                <span className="font-medium text-sm">Booked Calls</span>
              </Link>
              <Link 
                href="/admin/consultations" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <MessageSquare size={18} />
                <span className="font-medium text-sm">Consultations</span>
              </Link>
            </nav>
            <div className="p-4 border-t border-white/10">
              <Link 
                href="/" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-[#D946EF] hover:bg-[#D946EF]/10 transition-all duration-300"
              >
                <LogOut size={18} />
                <span className="font-medium text-sm">Exit Terminal</span>
              </Link>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-950/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(217,70,239,0.1)]">
            {children}
          </main>
        </div>
      </div>
  );
}
