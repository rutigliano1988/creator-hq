"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useAppState } from "@/components/AppState";

export default function AppShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    "block rounded-lg px-3 py-2 text-sm " +
    (pathname === href
      ? "bg-white/10 text-white"
      : "text-white/70 hover:bg-white/5");

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isIdeaModalOpen, setIsIdeaModalOpen] = useState(false);

    const { addTask, addIdea, channels } = useAppState();
    const [taskText, setTaskText] = useState("");
    const [ideaTitle, setIdeaTitle] = useState("");
    const [ideaChannelId, setIdeaChannelId] = useState("s1");

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-5">
        <div className="mb-6">
          <div className="text-lg font-semibold">Creator HQ</div>
          <div className="text-xs text-white/50">PANEL DE CONTROL</div>
        </div>

        <nav className="space-y-1">
          <Link href="/" className={linkClass("/")}>
            Dashboard
          </Link>
          <Link href="/produccion" className={linkClass("/produccion")}>
            Producción
          </Link>
          <Link href="/calendario" className={linkClass("/calendario")}>
            Calendario
          </Link>
          <Link href="/ideas" className={linkClass("/ideas")}>
            Ideas & Guiones
          </Link>
          <Link href="/metricas" className={linkClass("/metricas")}>
            Métricas
          </Link>
          <Link href="/checklists" className={linkClass("/checklists")}>
            Checklists
          </Link>
        </nav>

        <div className="mt-8">
          <div className="mb-2 text-xs tracking-wider text-white/40">CANALES</div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-white/5">
              <span className="text-white/80">Serenidad Profunda</span>
              <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs text-blue-200">
                S1
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-white/5">
              <span className="text-white/80">Arte de Vivir Mejor</span>
              <span className="rounded bg-yellow-500/20 px-2 py-0.5 text-xs text-yellow-200">
                S2
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-white/5">
              <span className="text-white/80">Kira y su Mundo</span>
              <span className="rounded bg-orange-500/20 px-2 py-0.5 text-xs text-orange-200">
                S3
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="flex gap-3">
            <button
                className="rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
                onClick={() => setIsTaskModalOpen(true)}
            >
                + Nueva Tarea
            </button>
            <button
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:opacity-90"
                onClick={() => setIsIdeaModalOpen(true)}
            >
                + Nueva Idea
            </button>
          </div>
        </div>

        {children}
        <Modal
            title="Nueva Tarea"
            isOpen={isTaskModalOpen}
            onClose={() => setIsTaskModalOpen(false)}
        >
            <div className="space-y-3">
                <label className="block text-sm text-white/70">Título</label>
                <input
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-sm outline-none focus:border-white/20"
                    placeholder="Ej: Subir banner a YouTube"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                />
                <button 
                className="w-full rounded-xl bg-white/10 p-3 text-sm hover:bg-white/15"
                onClick={() => {
                    addTask(taskText);
                    setTaskText("");
                    setIsTaskModalOpen(false);
                }}
                >
                    Guardar
                </button>
                <div className="text-xs text-white/50">
                    En el siguiente paso haremos que al “Guardar” se añada a la lista de tareas.
                </div>
            </div>
        </Modal>

        <Modal
            title="Nueva Idea"
            isOpen={isIdeaModalOpen}
            onClose={() => setIsIdeaModalOpen(false)}
        >
            <div className="space-y-3">
                <label className="block text-sm text-white/70">Título</label>
                <input
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-sm outline-none focus:border-white/20"
                    placeholder='Ej: "Frecuencia 432Hz: Relajación 1H"'
                    value={ideaTitle}
                    onChange={(e) => setIdeaTitle(e.target.value)}
                />
                <label className="block text-sm text-white/70">Canal</label>
                <select
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-sm outline-none focus:border-white/20"
                  value={ideaChannelId}
                  onChange={(e) => setIdeaChannelId(e.target.value)}
                >
                  {channels.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <button 
                className="w-full rounded-xl bg-emerald-500 p-3 text-sm font-medium text-black hover:opacity-90"
                onClick={() => {
                  addIdea(ideaTitle, ideaChannelId);
                  setIdeaTitle("");
                  setIdeaChannelId("s1");
                  setIsIdeaModalOpen(false);
                }}
                >
                    Guardar
                </button>
                <div className="text-xs text-white/50">
                    En el siguiente paso haremos que al “Guardar” se añada a “Ideas guardadas”.
                </div>
            </div>
        </Modal>
      </main>
    </div>
  );
}