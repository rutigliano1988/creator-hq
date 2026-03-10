import AppShell from "@/components/AppShell";

export default function ProduccionPage() {
  return (
    <AppShell title="Producción">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm text-white/70">
          Aquí iremos gestionando el flujo: Ideas → Guion → En producción → Publicado.
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Column title="Ideas" count={8} />
          <Column title="Guion listo" count={3} />
          <Column title="En producción" count={5} />
        </div>
      </div>
    </AppShell>
  );
}

function Column({ title, count }: { title: string; count: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">{title}</div>
        <div className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">
          {count}
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <Card text="Ejemplo item 1" />
        <Card text="Ejemplo item 2" />
      </div>
    </div>
  );
}

function Card({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/80">
      {text}
    </div>
  );
}