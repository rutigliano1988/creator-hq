"use client";

import AppShell from "@/components/AppShell";
import { useAppState } from "@/components/AppState";
import { channelName as channelNameFromMock, type Idea } from "@/lib/mockData";

export default function ProduccionPage() {
  const { ideas, moveIdea } = useAppState();
  const inProd = ideas.filter((i) => i.status === "IN_PRODUCTION");

  return (
    <AppShell title="Producción">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-white/70">
            Items actualmente en producción.
          </div>
          <div className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">
            {inProd.length}
          </div>
        </div>

        <ul className="space-y-2">
          {inProd.map((i) => (
            <ProdRow key={i.id} idea={i} onMove={moveIdea} />
          ))}

          {inProd.length === 0 ? (
            <li className="rounded-xl border border-dashed border-white/10 bg-black/10 p-4 text-sm text-white/50">
              No hay nada en producción. Ve a “Ideas & Guiones” y mueve alguna idea a “En producción”.
            </li>
          ) : null}
        </ul>
      </div>
    </AppShell>
  );
}

function ProdRow({
  idea,
  onMove,
}: {
  idea: Idea;
  onMove: (id: string, status: Idea["status"]) => void;
}) {
  return (
    <li className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 p-3">
      <div>
        <div className="text-sm font-medium">{idea.title}</div>
        <div className="mt-1 text-xs text-white/50">{channelNameFromMock(idea.channelId)}</div>
      </div>

      <div className="flex gap-2">
        <button
          className="rounded-lg bg-white/10 px-3 py-1 text-xs hover:bg-white/15"
          onClick={() => onMove(idea.id, "SCRIPT_READY")}
        >
          ← Guion listo
        </button>
        <button
          className="rounded-lg bg-white/10 px-3 py-1 text-xs hover:bg-white/15"
          onClick={() => onMove(idea.id, "PUBLISHED")}
        >
          ✓ Publicado
        </button>
      </div>
    </li>
  );
}