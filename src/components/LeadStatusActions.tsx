"use client";

import { useState } from "react";
import { updateLeadStatus } from "@/actions/lead.actions";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

export function LeadStatusActions({ id, currentStatus }: { id: string, currentStatus: string }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (status: string) => {
    setIsUpdating(true);
    await updateLeadStatus(id, status);
    setIsUpdating(false);
  };

  return (
    <div className="flex items-center gap-2">
      <button 
        disabled={isUpdating || currentStatus === 'DONE'}
        onClick={() => handleUpdate('DONE')}
        title="Mark Done"
        className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
      >
        <CheckCircle2 size={16} />
      </button>
      <button 
        disabled={isUpdating || currentStatus === 'CANCELLED'}
        onClick={() => handleUpdate('CANCELLED')}
        title="Cancel"
        className="p-1.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-colors disabled:opacity-50"
      >
        <XCircle size={16} />
      </button>
      <button 
        disabled={isUpdating || currentStatus === 'PENDING'}
        onClick={() => handleUpdate('PENDING')}
        title="Mark Pending"
        className="p-1.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-colors disabled:opacity-50"
      >
        <Clock size={16} />
      </button>
    </div>
  );
}
