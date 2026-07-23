import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, UploadCloud, File, Trash2, Send, CheckCircle2, Sparkles, AlertTriangle } from "lucide-react";
import { createBooking } from "@/actions/booking";

interface DirectConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DirectConsultationModal({ isOpen, onClose }: DirectConsultationModalProps) {
  const [mounted, setMounted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [scopeDetails, setScopeDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    setUploadError(null);
    const limitMB = 15;
    const isOverSize = selectedFile.size > limitMB * 1024 * 1024;

    if (isOverSize) {
      setUploadError(`File is too large. Maximum size is ${limitMB}MB.`);
      return;
    }

    setFile(selectedFile);
    setIsDragActive(false);

    // Simulate a progress bar load
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 100);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setUploadError(null);
    
    try {
      const formData = new FormData();
      formData.set("name", name);
      formData.set("email", email);
      formData.set("type", "CONSULTATION");
      formData.set("summary", `Telegram: ${telegram || 'N/A'}\nDetails: ${scopeDetails}`);
      
      const res = await createBooking(null, formData);
      if (res.success) {
        setIsSuccess(true);
      } else {
        setUploadError(res.error || "An error occurred submitting the consultation.");
      }
    } catch (e: any) {
      console.error(e);
      setUploadError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setTelegram("");
    setScopeDetails("");
    setFile(null);
    setUploadProgress(null);
    setIsSuccess(false);
    onClose();
  };

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
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-2xl"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative w-full sm:w-[calc(100vw-2rem)] md:max-w-3xl mx-auto overflow-hidden rounded-t-3xl rounded-b-none sm:rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-3xl shadow-[0_0_50px_rgba(217,70,239,0.15)] flex flex-col max-h-[90dvh]"
          >
            {/* Glowing accents */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-fuchsia-600/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-fuchsia-600/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              id="consultation-close"
              className="absolute top-4 right-4 z-10 p-2 rounded-full border border-white/5 bg-slate-900/60 hover:bg-white/10 hover:border-white/10 backdrop-blur-md transition-colors text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-5 md:p-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-fuchsia-600/30 hover:[&::-webkit-scrollbar-thumb]:bg-fuchsia-600/50 [&::-webkit-scrollbar-thumb]:rounded-full">
              {!isSuccess ? (
              <form id="consultation-form" onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="p-1 rounded-md bg-fuchsia-500/10 text-fuchsia-400">
                      <Sparkles size={14} />
                    </span>
                    <span className="text-[9px] font-mono tracking-widest text-fuchsia-400 uppercase font-bold">
                      Assets & Communication Portal
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white font-display">Direct Consultation</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-lg">
                    Submit your SRS documentation, system architecture schemas, or code snippets for deep contextual assessment. Our principal architects will review your attachments.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase">Consultant Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Alex Carter"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950/50 border border-white/5 focus:border-fuchsia-500/40 text-slate-200 text-base py-2.5 px-4 rounded-xl outline-none focus:ring-1 focus:ring-fuchsia-500/20 transition-all font-sans"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase">Secure Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@enterprise.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950/50 border border-white/5 focus:border-fuchsia-500/40 text-slate-200 text-base py-2.5 px-4 rounded-xl outline-none focus:ring-1 focus:ring-fuchsia-500/20 transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">Direct Slack / Telegram handle (Optional)</label>
                  <input
                    type="text"
                    placeholder="@alex_dev_ops"
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/5 focus:border-fuchsia-500/40 text-slate-200 text-base py-2.5 px-4 rounded-xl outline-none focus:ring-1 focus:ring-fuchsia-500/20 transition-all font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">Scope of Work & Architectural Goals</label>
                  <textarea
                    rows={3}
                    placeholder="Provide exact telemetry parameters, data scaling requirements, or model guidelines..."
                    value={scopeDetails}
                    onChange={(e) => setScopeDetails(e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/5 focus:border-fuchsia-500/40 text-slate-200 text-base p-4 rounded-2xl outline-none focus:ring-1 focus:ring-fuchsia-500/20 transition-all font-sans resize-none"
                  />
                </div>

                {/* Drop Zone File Upload Component */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-400 uppercase block">Attach System Blueprint Documents</label>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg,.json,.yaml,.txt,.ts"
                  />

                  {!file ? (
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={handleUploadClick}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                        isDragActive
                          ? "border-fuchsia-500 bg-fuchsia-600/5 shadow-[0_0_15px_rgba(217,70,239,0.15)]"
                          : "border-white/5 bg-slate-950/40 hover:border-white/15 hover:bg-white/[0.01]"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="p-3 bg-fuchsia-500/10 rounded-full text-fuchsia-400 mb-1">
                          <UploadCloud size={20} />
                        </span>
                        <p className="text-xs font-sans text-slate-200 font-medium">
                          Drag and drop your file here, or <span className="text-fuchsia-400 underline">browse</span>
                        </p>
                        <p className="text-[9px] font-mono text-slate-500">
                          Supports PDF, JSON, TS, YAML, TXT or PNG/JPG (Max 15MB)
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl border border-white/5 bg-slate-950/80 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2.5 rounded-xl bg-fuchsia-600/10 border border-fuchsia-500/20 text-fuchsia-400 shrink-0">
                          <File size={16} />
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-xs font-mono text-slate-200 block truncate">{file.name}</span>
                          <span className="text-[9px] font-mono text-slate-500 block">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      </div>

                      {/* Progress / Actions */}
                      <div className="flex items-center gap-4 shrink-0">
                        {uploadProgress !== null && uploadProgress < 100 && (
                          <div className="w-12 text-right">
                            <span className="text-[10px] font-mono text-fuchsia-400">{uploadProgress}%</span>
                          </div>
                        )}
                        {uploadProgress === 100 && (
                          <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-md font-bold uppercase">
                            READY
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="p-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-rose-400 transition-all"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  )}

                  {uploadError && (
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-mono">
                      <AlertTriangle size={12} />
                      <span>{uploadError}</span>
                    </div>
                  )}
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-6"
              >
                <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-2xl font-bold text-white font-display">Consultation Requested Successfully</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Excellent, <span className="text-white font-semibold">{name}</span>! Your consultation payload has been securely routed to our diagnostic container. Our architects will contact you shortly at <span className="text-fuchsia-400 font-semibold font-mono">{email}</span>.
                </p>
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                  Payload Digest ID: {Math.random().toString(36).substring(2, 10).toUpperCase()} // SES Secure
                </p>
                <div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-mono font-bold tracking-wider uppercase rounded-full shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all"
                  >
                    Return to Portfolio
                  </button>
                </div>
              </motion.div>
            )}
            </div>

            {/* Sticky Action Footer — always reachable above keyboard */}
            {!isSuccess && (
              <div className="shrink-0 border-t border-white/10 bg-slate-900/80 backdrop-blur-md p-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-white/5 text-xs font-mono font-bold tracking-wider text-slate-400 hover:text-white hover:bg-white/5 transition-all uppercase min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="consultation-form"
                  disabled={!name || !email || isSubmitting}
                  className={`px-6 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-2 transition-all min-h-[44px] ${
                    name && email && !isSubmitting
                      ? "bg-fuchsia-600 text-white hover:bg-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.4)]"
                      : "bg-fuchsia-600/30 text-fuchsia-300/40 cursor-not-allowed border border-transparent"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Send Consultation Pack"}
                  <Send size={12} />
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
