"use client";

import AppShell from "@/components/AppShell";
import { useAppState } from "@/components/AppState";
import { channelName as channelNameFromMock, type Idea } from "@/lib/mockData";

export default function IdeasPage() {
  const { ideas, moveIdea } = useAppState();

  return (
    <AppShell title="Ideas & Guiones">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <Column title="Ideas guardadas" ideas={ideas} status="SAVED" moveIdea={moveIdea} />
        <Column title="Guion listo" ideas={ideas} status="SCRIPT_READY" moveIdea={moveIdea} />
        <Column title="En producción" ideas={ideas} status="IN_PRODUCTION" moveIdea={moveIdea} />
        <Column title="Publicado" ideas={ideas} status="PUBLISHED" moveIdea={moveIdea} />
      </div>
    </AppShell>
  );
}

function Column({
  title,
  ideas,
  status,
  moveIdea,
}: {
  title: string;
  ideas: Idea[];
  status: Idea["status"];
  moveIdea: (id: string, status: Idea["status"]) => void;
}) {
  const filtered = ideas.filter((i) => i.status === status);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold">{title}</div>
        <div className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">
          {filtered.length}
        </div>
      </div>

      <ul className="space-y-2">
        {filtered.map((i) => (
          <IdeaCard
            key={i.id}
            idea={i}
            moveIdea={moveIdea}
          />
        ))}

        {filtered.length === 0 ? (
          <li className="rounded-xl border border-dashed border-white/10 bg-black/10 p-3 text-xs text-white/40">
            Sin items
          </li>
        ) : null}
      </ul>
    </div>
  );
}

function IdeaCard({
  idea,
  moveIdea,
}: {
  idea: Idea;
  moveIdea: (id: string, status: Idea["status"]) => void;
}) {
  const channel = channelNameFromMock(idea.channelId);

  return (
    <li className="rounded-xl border border-white/10 bg-black/20 p-3">
      <div className="text-sm font-medium">{idea.title}</div>
      <div className="mt-1 text-xs text-white/50">{channel}</div>

      <div className="mt-3 flex flex-wrap gap-2">
        {idea.status !== "SAVED" && (
          <button
            className="rounded-lg bg-white/10 px-2 py-1 text-xs hover:bg-white/15"
            onClick={() => moveIdea(idea.id, "SAVED")}
          >
            → Guardada
          </button>
        )}

        {idea.status !== "SCRIPT_READY" && (
          <button
            className="rounded-lg bg-white/10 px-2 py-1 text-xs hover:bg-white/15"
            onClick={() => moveIdea(idea.id, "SCRIPT_READY")}
          >
            → Guion listo
          </button>
        )}

        {idea.status !== "IN_PRODUCTION" && (
          <button
            className="rounded-lg bg-white/10 px-2 py-1 text-xs hover:bg-white/15"
            onClick={() => moveIdea(idea.id, "IN_PRODUCTION")}
          >
            → Producción
          </button>
        )}

        {idea.status !== "PUBLISHED" && (
          <button
            className="rounded-lg bg-white/10 px-2 py-1 text-xs hover:bg-white/15"
            onClick={() => moveIdea(idea.id, "PUBLISHED")}
          >
            → Publicado
          </button>
        )}
      </div>
    </li>
  );
}