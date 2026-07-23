"use client";

import React, { useState, useRef } from "react";

import { createProject } from "@/actions/project.actions";
import { useUploadThing } from "@/lib/uploadthing";

export default function AdminNewProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [techStack, setTechStack] = useState(['', '', '']);
  const [error, setError] = useState("");
  const { startUpload, isUploading } = useUploadThing("imageUploader");
  const formRef = useRef<HTMLFormElement>(null);

  const updateTechStack = (index: number, value: string) => {
    setTechStack(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!thumbnailUrl) {
      setError("Thumbnail Image is required. Please upload an image first.");
      return;
    }

    setIsSubmitting(true);
    setToastMessage(null);

    try {
      const formData = new FormData(e.currentTarget);

      // Remove any raw tag inputs from FormData and build the clean array
      formData.delete("tag_0");
      formData.delete("tag_1");
      formData.delete("tag_2");
      const finalTags = techStack.filter(tag => tag.trim() !== '');
      finalTags.forEach(t => formData.append("tech_stack", t.trim()));

      const result = await createProject(null, formData);

      if (result.success) {
        setToastMessage({ type: 'success', text: result.message });
        formRef.current?.reset();
        setThumbnailUrl("");
        setTechStack(['', '', '']);
      } else {
        setError(result.message);
        setToastMessage({ type: 'error', text: result.message });
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setToastMessage(null), 5000);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-8 flex justify-center">
      <div className="w-full max-w-4xl">

        <header className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500 mb-2">
            Add New Project
          </h1>
          <p className="text-[#D946EF] font-mono tracking-widest uppercase text-xs">
            Aether Intelligence Center // Admin Module
          </p>
        </header>

        {/* Toast Notification */}
        {toastMessage && (
          <div className={`mb-8 p-4 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${toastMessage.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400'
              : 'bg-[#FF0000]/10 border-[#FF0000]/30 text-[#FF0000]'
            }`}>
            <span className="font-mono text-sm">{toastMessage.text}</span>
          </div>
        )}

        {/* Glassmorphism Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-slate-950/10 backdrop-blur-sm border border-white/10 rounded-3xl p-4 md:p-8 shadow-[0_0_50px_rgba(217,70,239,0.05)] space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Project Title</label>
              <input required type="text" name="title" className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors" />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Unique Slug (URL)</label>
              <input required type="text" name="slug" className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors font-mono text-sm" />
            </div>

            {/* Thumbnail URL */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Thumbnail Image</label>
              
              <div>
                <input 
                  type='file' 
                  accept='image/*' 
                  id='thumbnail-upload' 
                  className='hidden' 
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const res = await startUpload([file]);
                      if (res && res.length > 0) {
                        setThumbnailUrl(res[0].url);
                        setToastMessage({ type: 'success', text: "Image uploaded successfully!" });
                      }
                    } catch (error: any) {
                      setToastMessage({ type: 'error', text: `Upload failed: ${error.message}` });
                    }
                  }} 
                />
                <label 
                  htmlFor='thumbnail-upload' 
                  className='flex items-center justify-center w-full p-3 border border-purple-500/30 rounded-xl bg-purple-950/20 cursor-pointer hover:bg-purple-900/40 text-purple-300 transition-all font-mono text-xs uppercase tracking-widest'
                >
                  {isUploading ? "Uploading..." : "Click to Select & Upload Image"}
                </label>
              </div>

              {thumbnailUrl && !isUploading && (
                <div className="flex items-center gap-3 mt-3 w-full bg-black/20 p-2 rounded-lg border border-white/5">
                  <img src={thumbnailUrl} alt="Thumbnail preview" className="w-16 h-16 object-cover rounded-md border border-white/10" />
                  <span className="text-xs text-emerald-400 font-mono tracking-wider uppercase">Upload Confirmed</span>
                </div>
              )}
              
              <input type="hidden" name="thumbnail_url" value={thumbnailUrl} required />
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Short Description</label>
              <textarea required name="description" rows={3} className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors resize-none" />
            </div>

            {/* Purpose */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Purpose</label>
              <input required type="text" name="purpose" className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors" />
            </div>

            {/* Audience */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Target Audience</label>
              <input required type="text" name="audience" className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors" />
            </div>

            {/* Tech Stack */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Tech Stack</label>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Tag 1</span>
                  <input type="text" name="tag_0" placeholder="Next.js" value={techStack[0]} onChange={(e) => updateTechStack(0, e.target.value)} className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors text-sm" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Tag 2</span>
                  <input type="text" name="tag_1" placeholder="React" value={techStack[1]} onChange={(e) => updateTechStack(1, e.target.value)} className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors text-sm" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Tag 3</span>
                  <input type="text" name="tag_2" placeholder="TypeScript" value={techStack[2]} onChange={(e) => updateTechStack(2, e.target.value)} className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors text-sm" />
                </div>
              </div>
            </div>

            {/* Total Cost */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Total Cost ($)</label>
              <input required type="number" step="0.01" name="total_cost" className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors font-mono" />
            </div>

            {/* Live URL */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Live URL</label>
              <input required type="text" name="live_url" className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors" />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Category</label>
              <input type="text" name="category" placeholder="e.g. Web App, AI Agent" className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors" />
            </div>

            {/* Latency */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Latency (e.g. 142ms)</label>
              <input type="text" name="latency" className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors font-mono" />
            </div>

            {/* Throughput */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Throughput (e.g. 420 req/s)</label>
              <input type="text" name="throughput" className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors font-mono" />
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col items-end gap-3">
            {error && (
              <span className="text-red-500 font-mono text-xs">{error}</span>
            )}
            <button
              disabled={isSubmitting}
              type="submit"
              className="px-8 py-4 bg-[#D946EF] hover:bg-[#c026d3] text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:shadow-[0_0_50px_rgba(217,70,239,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Deploying Project..." : "Deploy Project"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
