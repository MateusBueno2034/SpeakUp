import { useStore } from "../lib/store";
import { Button } from "../components/ui/button";
import { StatusBadge } from "../components/StatusBadge";
import { FilePlus2, History, MapPin, ArrowRight, AlertTriangle, ClipboardList } from "lucide-react";
import { CATEGORY_LABELS } from "../lib/types";

export function Dashboard() {
  const { user, reports, notifications, navigate } = useStore();
  const myReports = reports.filter((r) => r.authorEmail === user?.email);
  const counts = {
    abertas: myReports.filter((r) => r.status === "recebida").length,
    analise: myReports.filter((r) => r.status === "em_analise").length,
    andamento: myReports.filter((r) => ["encaminhada", "em_andamento"].includes(r.status)).length,
    resolvidas: myReports.filter((r) => r.status === "resolvida").length,
  };
  const recent = myReports.slice(0, 4);

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="text-sm text-neutral-500">Bem-vindo de volta</div>
          <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.01em" }}>Olá, {user?.name.split(" ")[0]}</h1>
          <p className="text-sm text-neutral-600 mt-1">Acompanhe o status das suas denúncias e registre novas ocorrências.</p>
        </div>
        <Button onClick={() => navigate({ name: "new-report" })}><FilePlus2 className="w-4 h-4 mr-2" /> Nova denúncia</Button>
      </div>

      {/* Alerta importante */}
      <div className="rounded-xl border border-neutral-200 bg-neutral-900 text-white p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-md bg-white/10 grid place-items-center"><AlertTriangle className="w-4 h-4" /></div>
          <div>
            <div style={{ fontWeight: 500 }}>Sua denúncia SPK-2026-0148 está em andamento</div>
            <div className="text-sm text-neutral-300 mt-0.5">A equipe de pavimentação programou o reparo. Verifique os detalhes para cronograma.</div>
          </div>
        </div>
        <Button variant="secondary" onClick={() => navigate({ name: "report-detail", id: "r1" })}>Ver detalhes</Button>
      </div>

      {/* Cards de contagem */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Abertas", v: counts.abertas, d: "Aguardando triagem" },
          { l: "Em análise", v: counts.analise, d: "Sob avaliação técnica" },
          { l: "Em andamento", v: counts.andamento, d: "Encaminhadas ou em execução" },
          { l: "Resolvidas", v: counts.resolvidas, d: "Concluídas pela administração" },
        ].map((c) => (
          <div key={c.l} className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="text-sm text-neutral-500">{c.l}</div>
            <div className="mt-2" style={{ fontSize: 30, fontWeight: 600 }}>{c.v}</div>
            <div className="text-xs text-neutral-500 mt-1">{c.d}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recentes */}
        <div className="lg:col-span-2 rounded-xl border border-neutral-200 bg-white">
          <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
            <div>
              <div style={{ fontWeight: 600 }}>Denúncias recentes</div>
              <div className="text-xs text-neutral-500">Suas últimas ocorrências registradas</div>
            </div>
            <button onClick={() => navigate({ name: "history" })} className="text-sm text-neutral-700 hover:underline inline-flex items-center gap-1">
              Ver histórico <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <ul className="divide-y divide-neutral-100">
            {recent.length === 0 && (
              <li className="px-5 py-10 text-center text-sm text-neutral-500">
                <ClipboardList className="w-6 h-6 mx-auto mb-2 text-neutral-400" />
                Você ainda não registrou nenhuma denúncia.
              </li>
            )}
            {recent.map((r) => (
              <li key={r.id} className="px-5 py-4 hover:bg-neutral-50 cursor-pointer" onClick={() => navigate({ name: "report-detail", id: r.id })}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <span className="font-mono">{r.protocol}</span>
                      <span>·</span>
                      <span>{CATEGORY_LABELS[r.category]}</span>
                    </div>
                    <div className="mt-1 truncate" style={{ fontWeight: 500 }}>{r.title}</div>
                    <div className="text-xs text-neutral-500 mt-1">{r.address} · {r.district}</div>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Notificações + atalhos */}
        <div className="space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white">
            <div className="px-5 py-4 border-b border-neutral-200">
              <div style={{ fontWeight: 600 }}>Notificações recentes</div>
              <div className="text-xs text-neutral-500">Atualizações sobre suas denúncias</div>
            </div>
            <ul className="divide-y divide-neutral-100">
              {notifications.slice(0, 4).map((n) => (
                <li key={n.id} className="px-5 py-3 flex items-start gap-2">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${n.read ? "bg-neutral-300" : "bg-neutral-900"}`} />
                  <div className="min-w-0">
                    <div className="text-sm" style={{ fontWeight: 500 }}>{n.title}</div>
                    <div className="text-xs text-neutral-600 truncate">{n.message}</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">{new Date(n.date).toLocaleString("pt-BR")}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-5 space-y-2">
            <div style={{ fontWeight: 600 }}>Atalhos</div>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate({ name: "history" })}><History className="w-4 h-4 mr-2" /> Histórico completo</Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate({ name: "map" })}><MapPin className="w-4 h-4 mr-2" /> Mapa de ocorrências</Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate({ name: "new-report" })}><FilePlus2 className="w-4 h-4 mr-2" /> Registrar nova denúncia</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
