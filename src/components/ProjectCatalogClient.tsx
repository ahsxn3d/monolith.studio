"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Project } from "@prisma/client";
import { createProject, updateProject, deleteProject } from "../actions/project.actions";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/lib/uploadthing";
import { UploadCloud } from "lucide-react";

interface ProjectCatalogClientProps {
  initialProjects: Project[];
}

export function ProjectCatalogClient({ initialProjects }: ProjectCatalogClientProps) {
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [techStack, setTechStack] = useState(['', '', '']);
  const [latency, setLatency] = useState('');
  const [throughput, setThroughput] = useState('');
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const { startUpload, isUploading } = useUploadThing("imageUploader");
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const openNewModal = () => {
    setEditingProject(null);
    setThumbnailUrl("");
    setTitle("");
    setSlug("");
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setThumbnailUrl(project.thumbnail_url || "");
    setTitle(project.title || "");
    setSlug(project.slug || "");
    if (project.tech_stack && project.tech_stack.length > 0) {
      setTechStack([project.tech_stack[0] || '', project.tech_stack[1] || '', project.tech_stack[2] || '']);
    } else {
      setTechStack(['', '', '']);
    }
    setLatency(project.latency || "");
    setThroughput(project.throughput || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setToastMessage(null);
    setThumbnailUrl("");
    setTitle("");
    setSlug("");
    setTechStack(['', '', '']);
    setLatency("");
    setThroughput("");
  };

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    const result = await deleteProject(id);
    if (result.success) {
      setProjects(prev => prev.filter(p => p.id !== id));
      showToast('success', result.message);
    } else {
      showToast('error', result.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const formTitle = (formData.get("title") as string) || title;
      const formSlug = (formData.get("slug") as string) || slug;

      if (!formTitle || !formSlug || !thumbnailUrl) {
        const missing = [];
        if (!formTitle) missing.push("Title");
        if (!formSlug) missing.push("Slug");
        if (!thumbnailUrl) missing.push("Image");
        setError(`Missing required fields: ${missing.join(', ')}`);
        setIsLoading(false);
        return;
      }

      formData.set("title", formTitle);
      formData.set("slug", formSlug);

      const finalTechStack = techStack.filter(tag => tag.trim() !== '');
      finalTechStack.forEach(tag => formData.append("tech_stack", tag));

      formData.append("latency", latency);
      formData.append("throughput", throughput);

      let result;
      if (editingProject) {
        result = await updateProject(editingProject.id, null, formData);
      } else {
        result = await createProject(null, formData);
      }

      if (result.success) {
        showToast('success', result.message);

        const updatedProject = {
          id: editingProject ? editingProject.id : (result as any).projectId,
          title: formData.get("title") as string,
          slug: formData.get("slug") as string,
          thumbnail_url: formData.get("thumbnail_url") as string,
          description: formData.get("description") as string,
          purpose: formData.get("purpose") as string,
          audience: formData.get("audience") as string,
          total_cost: parseFloat(formData.get("total_cost") as string),
          live_url: formData.get("live_url") as string,
          tech_stack: finalTechStack,
          latency: formData.get("latency") as string,
          throughput: formData.get("throughput") as string,
          status: editingProject ? editingProject.status : "ACTIVE",
        } as Project;

        if (editingProject) {
          setProjects(prev => prev.map(p => p.id === editingProject.id ? updatedProject : p));
        } else {
          setProjects(prev => [...prev, updatedProject]);
        }

        router.refresh();
        closeModal();
      } else {
        setError(result.message || 'Failed to deploy project');
        showToast('error', result.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to deploy project');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toast Notification Container (Fixed) */}
      {mounted && toastMessage && createPortal(
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[60]">
          <div className={`p-4 rounded-xl border flex items-center gap-3 shadow-2xl ${toastMessage.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-400'
              : 'bg-[#FF0000]/20 border-[#FF0000]/50 text-[#FF0000] backdrop-blur-md'
            }`}>
            <span className="font-mono text-sm">{toastMessage.text}</span>
          </div>
        </div>,
        document.body
      )}

      {/* Floating Action Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={openNewModal}
          className="group relative px-8 py-4 bg-[#D946EF] hover:bg-[#c026d3] text-white font-mono uppercase tracking-widest rounded-full transition-all shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:shadow-[0_0_50px_rgba(217,70,239,0.5)] font-bold"
        >
          + Initialize Project
        </button>
      </div>

      {/* Table View */}
      <div className="w-full bg-slate-950/40 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_0_50px_rgba(217,70,239,0.15)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-slate-950/60 backdrop-blur-md">
                <th className="p-6 text-xs font-mono text-slate-500 uppercase tracking-widest font-normal">Project Title</th>
                <th className="p-6 text-xs font-mono text-slate-500 uppercase tracking-widest font-normal">Slug</th>
                <th className="p-6 text-xs font-mono text-slate-500 uppercase tracking-widest font-normal">Cost</th>
                <th className="p-6 text-xs font-mono text-slate-500 uppercase tracking-widest font-normal">Status</th>
                <th className="p-6 text-xs font-mono text-slate-500 uppercase tracking-widest font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-600 font-mono text-sm">No projects currently deployed.</td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-white/[0.02] transition-colors duration-300 group">
                    <td className="p-6 text-white font-medium flex items-center gap-4">
                      <div className="w-10 h-10 rounded-md overflow-hidden border border-white/10 bg-black/50">
                        {project.thumbnail_url && (
                          <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      {project.title}
                    </td>
                    <td className="p-6 text-slate-400 font-mono text-xs">/{project.slug}</td>
                    <td className="p-6 text-emerald-400 font-mono text-xs">${project.total_cost.toLocaleString()}</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase rounded-full border ${project.status === 'COMPLETED' ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' :
                          project.status === 'ACTIVE' ? 'border-fuchsia-500/50 text-[#D946EF] bg-fuchsia-500/10 shadow-[0_0_10px_rgba(217,70,239,0.2)]' :
                            'border-amber-500/50 text-amber-400 bg-amber-500/10'
                        }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="p-6 text-right space-x-3">
                      <button
                        onClick={() => openEditModal(project)}
                        className="text-xs font-mono tracking-widest uppercase text-slate-400 hover:text-white transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-xs font-mono tracking-widest uppercase text-rose-500/70 hover:text-rose-500 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* The Modal */}
      {mounted && isModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-[#030014]/60 backdrop-blur-sm" onClick={closeModal} />

          <div className="relative w-full sm:max-w-4xl max-h-[90dvh] flex flex-col bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-t-3xl rounded-b-none sm:rounded-3xl shadow-[0_0_50px_rgba(217,70,239,0.2)] overflow-hidden">
            <div className="flex-1 overflow-y-auto overscroll-contain p-5 md:p-8">
              <div className="flex justify-between items-center mb-6 md:mb-8 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#D946EF] to-[#c026d3]">
                {editingProject ? "Modify Project Record" : "Add New Project"}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-white font-mono text-xs uppercase tracking-widest">
                [ Close ]
              </button>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Project Title</label>
                  <input required type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors text-base font-sans" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Unique Slug (URL)</label>
                  <input required type="text" name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors font-mono text-base" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Thumbnail Image</label>
                  
                  {/* Preview */}
                  {thumbnailUrl && (
                    <div className="flex items-center gap-3 mb-3 bg-black/20 p-3 rounded-xl border border-white/5">
                      <img src={thumbnailUrl} alt="Thumbnail preview" className="w-20 h-20 object-cover rounded-lg border border-white/10" />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-emerald-400 font-mono tracking-wider uppercase">Upload Confirmed</span>
                        <button type="button" onClick={() => setThumbnailUrl("")} className="text-[10px] font-mono text-rose-400 hover:text-rose-300 uppercase tracking-wider text-left">Remove</button>
                      </div>
                    </div>
                  )}

                  {/* Drag & Drop Zone */}
                  <div 
                    className={`relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                      isDragActive 
                        ? 'border-[#D946EF] bg-[#D946EF]/10' 
                        : 'border-purple-500/30 bg-purple-950/20 hover:bg-purple-900/30 hover:border-purple-400/50'
                    }`}
                    onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragActive(true); }}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragActive(true); }}
                    onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragActive(false); }}
                    onDrop={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDragActive(false);
                      const file = e.dataTransfer.files?.[0];
                      if (!file || !file.type.startsWith('image/')) return;
                      try {
                        const res = await startUpload([file]);
                        if (res && res.length > 0) {
                          const uploadedUrl = res[0].url || (res[0] as any).fileUrl || (res[0] as any).appUrl;
                          setThumbnailUrl(uploadedUrl);
                          showToast('success', 'Image uploaded successfully!');
                        }
                      } catch (error: any) {
                        showToast('error', `Upload failed: ${error.message}`);
                      }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input 
                      type='file' 
                      accept='image/*' 
                      ref={fileInputRef}
                      className='hidden' 
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          const res = await startUpload([file]);
                          if (res && res.length > 0) {
                            const uploadedUrl = res[0].url || (res[0] as any).fileUrl || (res[0] as any).appUrl;
                            setThumbnailUrl(uploadedUrl);
                            showToast('success', 'Image uploaded successfully!');
                          }
                        } catch (error: any) {
                          showToast('error', `Upload failed: ${error.message}`);
                        }
                      }} 
                    />
                    
                    <div className="w-12 h-12 rounded-full bg-[#D946EF]/10 border border-[#D946EF]/30 flex items-center justify-center mb-4">
                      <UploadCloud size={22} className="text-[#D946EF]" />
                    </div>
                    
                    <p className="text-sm text-slate-300">
                      {isUploading ? (
                        <span className="text-[#D946EF] animate-pulse font-mono">Uploading...</span>
                      ) : (
                        <>Drag and drop your image here, or <span className="text-[#D946EF] underline">browse</span></>
                      )}
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 mt-2 tracking-wider uppercase">Supports PNG/JPG (Max 4MB)</p>
                  </div>

                  <input type="hidden" name="thumbnail_url" value={thumbnailUrl} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Short Description</label>
                  <textarea required name="description" defaultValue={editingProject?.description} rows={3} className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors resize-none text-base font-sans" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Purpose</label>
                  <input required type="text" name="purpose" defaultValue={editingProject?.purpose} className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors text-base font-sans" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Target Audience</label>
                  <input required type="text" name="audience" defaultValue={editingProject?.audience} className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors text-base font-sans" />
                </div>
                <div className="flex flex-col gap-2 mt-4 w-full md:col-span-2">
                  <label className="text-sm font-semibold text-purple-300">Tech Stack</label>
                  <div className="grid grid-cols-3 gap-3">
                    <input type="text" placeholder="Tag 1 (e.g. Next.js)" value={techStack[0]} onChange={(e) => { const newTags = [...techStack]; newTags[0] = e.target.value; setTechStack(newTags); }} className="w-full p-3 bg-black/50 border border-purple-500/30 rounded-md text-white text-base font-sans" />
                    <input type="text" placeholder="Tag 2" value={techStack[1]} onChange={(e) => { const newTags = [...techStack]; newTags[1] = e.target.value; setTechStack(newTags); }} className="w-full p-3 bg-black/50 border border-purple-500/30 rounded-md text-white text-base font-sans" />
                    <input type="text" placeholder="Tag 3" value={techStack[2]} onChange={(e) => { const newTags = [...techStack]; newTags[2] = e.target.value; setTechStack(newTags); }} className="w-full p-3 bg-black/50 border border-purple-500/30 rounded-md text-white text-base font-sans" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-4 w-full md:col-span-2">
                  <label className="text-sm font-semibold text-purple-300">Performance Metrics</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Latency (e.g. 142ms)" value={latency} onChange={(e) => setLatency(e.target.value)} className="w-full p-3 bg-black/50 border border-purple-500/30 rounded-md text-white text-base font-sans" />
                    <input type="text" placeholder="Throughput (e.g. 420 req/s)" value={throughput} onChange={(e) => setThroughput(e.target.value)} className="w-full p-3 bg-black/50 border border-purple-500/30 rounded-md text-white text-base font-sans" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Total Cost ($)</label>
                  <input required type="number" step="0.01" name="total_cost" defaultValue={editingProject?.total_cost} className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors font-mono text-base" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Live URL</label>
                  <input required type="text" name="live_url" defaultValue={editingProject?.live_url} className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-white focus:border-[#D946EF] outline-none transition-colors text-base font-sans" />
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col items-end gap-3">
                {error && <span className="text-red-500 font-mono text-xs">{error}</span>}
                <div className="flex justify-end gap-4 w-full">
                  <button type="button" onClick={closeModal} className="px-8 py-4 text-slate-400 hover:text-white font-bold uppercase tracking-widest transition-all font-mono text-sm ml-auto">
                    Cancel
                  </button>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="px-8 py-4 bg-[#D946EF] hover:bg-[#c026d3] text-white font-mono uppercase tracking-widest rounded-full transition-all shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:shadow-[0_0_50px_rgba(217,70,239,0.5)] disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                  >
                    {isLoading ? "Deploying..." : (editingProject ? "Commit Modifications" : "Deploy Project")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>,
      document.body
      )}
    </>
  );
}
