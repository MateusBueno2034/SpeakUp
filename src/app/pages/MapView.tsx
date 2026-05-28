import { useState } from "react";
import { useStore } from "../lib/store";
import { CATEGORY_LABELS, STATUS_LABELS, type ReportCategory, type ReportStatus } from "../lib/types";
import { StatusBadge } from "../components/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { MapPin } from "lucide-react";

export function MapView({ adminMode = false }: { adminMode?: boolean }) {
  const { reports, navigate } = useStore();
  const [cat, setCat] = useState<string>("all");
  const [st, setSt] = useState<string>("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = reports.filter((r) => {
    if (cat !== "all" && r.category !== cat) return false;
    if (st !== "all" && r.status !== st) return false;
    return true;
  });
  const sel = filtered.find((r) => r.id === selected) ?? filtered[0];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 600 }}>Mapa de ocorrências</h1>
          <p className="text-sm text-neutral-600 mt-1">Visualização territorial das denúncias registradas na plataforma.</p>
        </div>
        <div className="flex gap-2">
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger className="w-44"><SelectValue placeholder="Categoria" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {Object.entries(CATEGORY_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={st} onValueChange={setSt}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              {Object.entries(STATUS_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-xl border border-neutral-200 bg-white overflow-hidden">
          {/* Mock map */}
          <div className="relative h-[460px] bg-neutral-100" style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}>
            {/* roads */}
            <div className="absolute top-1/3 left-0 right-0 h-1 bg-neutral-300" />
            <div className="absolute top-2/3 left-0 right-0 h-1 bg-neutral-300" />
            <div className="absolute top-0 bottom-0 left-1/3 w-1 bg-neutral-300" />
            <div className="absolute top-0 bottom-0 left-2/3 w-1 bg-neutral-300" />

            {filtered.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                className={`absolute -translate-x-1/2 -translate-y-full transition ${sel?.id === r.id ? "scale-110 z-20" : "z-10 hover:scale-105"}`}
                style={{ left: `${r.coords.x}%`, top: `${r.coords.y}%` }}
              >
                <div className={`w-7 h-7 rounded-full grid place-items-center ${sel?.id === r.id ? "bg-neutral-900 text-white ring-4 ring-neutral-900/15" : "bg-white text-neutral-900 border border-neutral-300"}`}>
                  <MapPin className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}

            <div className="absolute bottom-3 left-3 rounded-md bg-white/95 border border-neutral-200 px-3 py-2 text-xs text-neutral-600">
              {filtered.length} ocorrência(s) exibidas
            </div>
          </div>
          <div className="border-t border-neutral-200 px-4 py-3 flex flex-wrap gap-3 text-xs text-neutral-600">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-neutral-900" /> Selecionada</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-white border border-neutral-300" /> Demais ocorrências</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-1 bg-neutral-300 rounded" /> Via principal</div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          {sel ? (
            <>
              <div className="text-xs text-neutral-500 font-mono">{sel.protocol}</div>
              <div className="mt-1" style={{ fontWeight: 600 }}>{sel.title}</div>
              <div className="text-xs text-neutral-500 mt-1">{CATEGORY_LABELS[sel.category]}</div>
              <div className="mt-3"><StatusBadge status={sel.status} /></div>
              <p className="text-sm text-neutral-700 mt-3 line-clamp-4">{sel.description}</p>
              <div className="text-xs text-neutral-500 mt-3">{sel.address} · {sel.district}</div>
              <Button className="w-full mt-4" onClick={() => navigate(adminMode ? { name: "admin-detail", id: sel.id } : { name: "report-detail", id: sel.id })}>
                Ver detalhes
              </Button>
            </>
          ) : (
            <div className="text-sm text-neutral-500 text-center py-10">Selecione um ponto no mapa.</div>
          )}
        </div>
      </div>
    </div>
  );
}
