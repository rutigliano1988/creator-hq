"use client";

import AppShell from "@/components/AppShell";
import { useAppState } from "@/components/AppState";
import { channelName as channelNameFromMock } from "@/lib/mockData";

export default function Home() {
  const { urgentTasks, upcomingPublications, savedIdeasCount } = useAppState();

  return (
    <AppShell title="Dashboard">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard title="Videos Publicados" value="0" subtitle="Total en los 3 canales" />
        <StatCard title="En Producción" value="5" subtitle="Esta semana" />
        <StatCard
          title="Ideas Guardadas"
          value={String(savedIdeasCount)}
          subtitle="Sin producir aún"
        />
        <StatCard title="Próxima Publicación" value="—" subtitle="Pendiente" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Próximas Publicaciones">
          <ul className="space-y-3 text-sm">
            {upcomingPublications.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between rounded-lg bg-white/5 p-3"
              >
                <div>
                  <div className="font-medium">
                    {p.title}
                    {p.durationLabel ? ` · ${p.durationLabel}` : ""}
                  </div>
                  <div className="text-white/50">
                    {channelNameFromMock(p.channelId)}
                  </div>
                </div>
                <div className="text-white/50">
                  {p.dayLabel} · {p.timeLabel}
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Tareas Urgentes">
          <ul className="space-y-3 text-sm">
            {urgentTasks.map((t) => (
              <TaskRow key={t.id} text={t.text} />
            ))}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}

function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-wider text-white/50">{title}</div>
      <div className="mt-2 text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-sm text-white/50">{subtitle}</div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold">{title}</div>
      </div>
      {children}
    </div>
  );
}

function TaskRow({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
      <input type="checkbox" className="h-4 w-4" />
      <span className="text-white/80">{text}</span>
    </li>
  );
}