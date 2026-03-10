"use client";

export default function Modal({
  title,
  isOpen,
  onClose,
  children,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0f1627] p-5 shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm font-semibold">{title}</div>
          <button
            className="rounded-lg bg-white/10 px-3 py-1 text-sm hover:bg-white/15"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}