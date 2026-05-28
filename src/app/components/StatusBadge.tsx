import { STATUS_LABELS, type ReportStatus } from "../lib/types";

const styles: Record<ReportStatus, string> = {
  recebida: "bg-neutral-100 text-neutral-700 border-neutral-200",
  em_analise: "bg-neutral-200 text-neutral-800 border-neutral-300",
  encaminhada: "bg-amber-50 text-amber-800 border-amber-200",
  em_andamento: "bg-blue-50 text-blue-800 border-blue-200",
  resolvida: "bg-emerald-50 text-emerald-800 border-emerald-200",
  arquivada: "bg-neutral-50 text-neutral-500 border-neutral-200",
};

export function StatusBadge({ status, size = "md" }: { status: ReportStatus; size?: "sm" | "md" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${styles[status]} ${size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs"}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {STATUS_LABELS[status]}
    </span>
  );
}
