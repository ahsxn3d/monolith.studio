import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, Sparkles, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { createBooking } from "@/actions/booking";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  "09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"
];

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [meetingType, setMeetingType] = useState<"CALL" | "CONSULTATION">("CALL");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    setMounted(true);
  }, []);

  const year = currentMonth.getFullYear();
  const monthIndex = currentMonth.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDayIndex = new Date(year, monthIndex, 1).getDay();

  const monthName = currentMonth.toLocaleString("default", { month: "long" });

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, monthIndex - 1, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, monthIndex + 1, 1));
    setSelectedDate(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !name || !email) return;
    setIsSubmitting(true);

    // Build a proper date string for Prisma
    const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("type", meetingType);
    formData.set("scheduled_date", dateStr);
    formData.set("scheduled_time", selectedTime);
    formData.set("summary", description);

    const result = await createBooking(null, formData);
    
    if (result.success) {
      setIsSubmitted(true);
      setError("");
    } else {
      setError(result.error || "An error occurred.");
    }
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setName("");
    setEmail("");
    setDescription("");
    setMeetingType("CALL");
    setIsSubmitted(false);
    setError("");
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="relative w-full sm:w-[calc(100vw-2rem)] md:max-w-3xl mx-auto overflow-hidden rounded-t-3xl rounded-b-none sm:rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-2xl shadow-2xl flex flex-col max-h-[90dvh]"
          >
            {/* Ambient Radial Highlight */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-fuchsia-600/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-fuchsia-600/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              id="booking-modal-close"
              className="absolute top-4 right-4 z-10 p-2 rounded-full border border-white/5 bg-slate-900/60 hover:bg-white/10 hover:border-white/10 backdrop-blur-md transition-colors text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-5 md:p-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-fuchsia-600/30 hover:[&::-webkit-scrollbar-thumb]:bg-fuchsia-600/50 [&::-webkit-scrollbar-thumb]:rounded-full">
              {!isSubmitted ? (
              <form id="booking-form" onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="p-1.5 rounded-lg bg-fuchsia-500/10 text-fuchsia-400">
                      <Sparkles size={16} />
                    </span>
                    <span className="text-xs font-mono tracking-wider text-fuchsia-400 uppercase">Interactive Scheduler</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white font-display">Book a Strategy Session</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Select a date, time and share a quick summary of what you are building to get a custom roadmap.
                  </p>
                  
                  {error && (
                    <div className="mt-4 p-3 rounded-lg border border-red-500/50 bg-red-500/10 text-red-400 text-sm font-sans">
                      {error}
                    </div>
                  )}
                </div>

                {/* Meeting Type Selector */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setMeetingType("CALL")}
                    className={`flex-1 py-2.5 px-4 text-xs font-mono rounded-xl border text-center transition-all uppercase tracking-wider ${
                      meetingType === "CALL"
                        ? "bg-fuchsia-600/20 border-fuchsia-500 text-fuchsia-300 shadow-[0_0_10px_rgba(217,70,239,0.2)]"
                        : "bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/5 hover:border-white/10"
                    }`}
                  >
                    Book a Call
                  </button>
                  <button
                    type="button"
                    onClick={() => setMeetingType("CONSULTATION")}
                    className={`flex-1 py-2.5 px-4 text-xs font-mono rounded-xl border text-center transition-all uppercase tracking-wider ${
                      meetingType === "CONSULTATION"
                        ? "bg-fuchsia-600/20 border-fuchsia-500 text-fuchsia-300 shadow-[0_0_10px_rgba(217,70,239,0.2)]"
                        : "bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/5 hover:border-white/10"
                    }`}
                  >
                    Book a Consultation
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Calendar Widget */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-200 flex items-center gap-2">
                        <Calendar size={16} className="text-fuchsia-400" />
                        Select Date
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={handlePrevMonth}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <span className="text-xs font-mono text-slate-300 w-24 text-center">
                          {monthName} {year}
                        </span>
                        <button
                          type="button"
                          onClick={handleNextMonth}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="border border-white/5 rounded-2xl p-3 bg-slate-950/30">
                      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono uppercase text-slate-500 mb-2">
                        {DAYS_OF_WEEK.map((d) => (
                          <div key={d}>{d}</div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {/* Empty padding days */}
                        {Array.from({ length: firstDayIndex }).map((_, i) => (
                          <div key={`empty-${i}`} />
                        ))}

                        {/* Month days */}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const dateNum = i + 1;
                          const isSelected = selectedDate === dateNum;
                          const isToday = new Date().getDate() === dateNum && new Date().getMonth() === monthIndex;

                          return (
                            <button
                              key={`day-${dateNum}`}
                              type="button"
                              onClick={() => setSelectedDate(dateNum)}
                              className={`aspect-square text-xs font-mono rounded-lg flex items-center justify-center transition-all ${
                                isSelected
                                  ? "bg-fuchsia-600 text-white font-bold shadow-[0_0_12px_rgba(217,70,239,0.4)]"
                                  : isToday
                                  ? "border border-fuchsia-500/50 text-fuchsia-400 font-semibold"
                                  : "text-slate-300 hover:bg-white/5"
                              }`}
                            >
                              {dateNum}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Time Slots & Text Details */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-200 flex items-center gap-2">
                        <Clock size={16} className="text-fuchsia-400" />
                        Select Time (EST)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            disabled={!selectedDate}
                            onClick={() => setSelectedTime(slot)}
                            className={`py-2 px-3 text-xs font-mono rounded-xl border text-center transition-all ${
                              selectedTime === slot
                                ? "bg-fuchsia-600/20 border-fuchsia-500 text-fuchsia-300 shadow-[0_0_10px_rgba(217,70,239,0.2)]"
                                : !selectedDate
                                ? "opacity-40 cursor-not-allowed border-white/5 text-slate-600"
                                : "bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/5 hover:border-white/10"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-950/40 border border-white/5 focus:border-fuchsia-500/50 text-slate-200 text-base py-2.5 px-4 rounded-xl outline-none focus:ring-1 focus:ring-fuchsia-500/30 transition-all font-sans"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Work Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950/40 border border-white/5 focus:border-fuchsia-500/50 text-slate-200 text-base py-2.5 px-4 rounded-xl outline-none focus:ring-1 focus:ring-fuchsia-500/30 transition-all font-sans"
                      />
                      <textarea
                        placeholder="Briefly describe your project/idea"
                        rows={2}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-slate-950/40 border border-white/5 focus:border-fuchsia-500/50 text-slate-200 text-base py-2 px-4 rounded-xl outline-none focus:ring-1 focus:ring-fuchsia-500/30 transition-all font-sans resize-none"
                      />
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-5"
              >
                <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
                  <Check size={32} />
                </div>
                <h4 className="text-2xl font-bold text-white font-display">Session Confirmed.</h4>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  Our team will review your summary and contact you shortly.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm font-medium rounded-full shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all font-sans"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
            </div>

            {/* Sticky Action Footer — always reachable above keyboard */}
            {!isSubmitted && (
              <div className="shrink-0 border-t border-white/10 bg-slate-900/80 backdrop-blur-md p-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-white/5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all font-sans min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="booking-form"
                  disabled={!selectedDate || !selectedTime || !name || !email || isSubmitting}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all font-sans min-h-[44px] ${
                    selectedDate && selectedTime && name && email && !isSubmitting
                      ? "bg-fuchsia-600 text-white hover:bg-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.4)]"
                      : "bg-fuchsia-600/30 text-fuchsia-300/50 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "Booking..." : "Confirm Session"}
                  <Sparkles size={15} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
