import { useState } from "react";
import { useStore } from "../lib/store";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { StatusBadge } from "../components/StatusBadge";
import { CATEGORY_LABELS, PRIORITY_LABELS, STATUS_LABELS, type ReportStatus } from "../lib/types";
import { CheckCircle2, Copy, ArrowRight, MapPin, Calendar, User, MessageSquare, FileText, Search, Filter, Inbox } from "lucide-react";

export function ReportSent({ id }: { id: string }) {
  const { reports, navigate } = useStore();
  const report = reports.find((r) => r.id === id);
  if (!report) return <Empty title="Denúncia não encontrada" />;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-50 grid place-items-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6 text-emerald-700" />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 600 }}>Denúncia enviada com sucesso</h1>
        <p className="text-sm text-neutral-600 mt-2">Seu registro foi recebido. Use o protocolo abaixo para acompanhar o andamento.</p>

        <div className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-left">
          <div className="text-xs text-neutral-500">Número de protocolo</div>
          <div className="flex items-center justify-between mt-1">
            <div className="font-mono" style={{ fontSize: 20, fontWeight: 600 }}>{report.protocol}</div>
            <button onClick={() => navigator.clipboard?.writeText(report.protocol)} className="text-neutral-500 hover:text-neutral-900 text-sm inline-flex items-center gap-1.5">
              <Copy className="w-4 h-4" /> Copiar
            </button>
          </div>
        </div>

        <div className="mt-5 grid sm:grid-cols-2 gap-3 text-left">
          <Info label="Categoria" value={CATEGORY_LABELS[report.category]} />
          <Info label="Status inicial" value={<StatusBadge status={report.status} />} />
          <Info label="Endereço" value={report.address} />
          <Info label="Bairro" value={report.district || "—"} />
        </div>

        <div className="mt-6 rounded-md bg-neutral-50 border border-neutral-200 px-4 py-3 text-left text-xs text-neutral-600">
          Você receberá notificações sempre que houver atualização. O prazo médio de primeira análise é de até 5 dias úteis.
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
          <Button variant="outline" onClick={() => navigate({ name: "dashboard" })}>Ir ao dashboard</Button>
          <Button onClick={() => navigate({ name: "report-detail", id: report.id })}>Ver denúncia <ArrowRight className="w-4 h-4 ml-1" /></Button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-md border border-neutral-200 px-3 py-2.5 bg-white">
      <div className="text-xs text-neutral-500">{label}</div>
      <div className="text-sm mt-0.5">{value}</div>
    </div>
  );
}

export function ReportDetail({ id }: { id: string }) {
  const { reports, navigate } = useStore();
  const report = reports.find((r) => r.id === id);
  const [comment, setComment] = useState("");
  if (!report) return <Empty title="Denúncia não encontrada" />;

  const statusOrder: ReportStatus[] = ["recebida", "em_analise", "encaminhada", "em_andamento", "resolvida"];
  const currentIdx = statusOrder.indexOf(report.status);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <button onClick={() => navigate({ name: "history" })} className="text-sm text-neutral-500 hover:text-neutral-900">← Voltar ao histórico</button>
        <div className="mt-2 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <div className="text-xs text-neutral-500 font-mono">{report.protocol}</div>
            <h1 style={{ fontSize: 24, fontWeight: 600 }} className="mt-1">{report.title}</h1>
            <div className="text-sm text-neutral-600 mt-1">{CATEGORY_LABELS[report.category]} · Prioridade {PRIORITY_LABELS[report.priority]}</div>
          </div>
          <StatusBadge status={report.status} />
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <div className="text-sm text-neutral-500 mb-4">Progresso da ocorrência</div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {statusOrder.map((s, i) => (
            <div key={s} className="flex items-center flex-1 min-w-[120px]">
              <div className={`flex-1 flex flex-col items-center text-center ${i <= currentIdx ? "text-neutral-900" : "text-neutral-400"}`}>
                <div className={`w-7 h-7 rounded-full grid place-items-center text-xs ${i <= currentIdx ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-400"}`}>{i + 1}</div>
                <div className="text-xs mt-2">{STATUS_LABELS[s]}</div>
              </div>
              {i < statusOrder.length - 1 && <div className={`h-px flex-1 ${i < currentIdx ? "bg-neutral-900" : "bg-neutral-200"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <div style={{ fontWeight: 600 }}>Descrição</div>
            <p className="text-sm text-neutral-700 mt-2 whitespace-pre-line">{report.description}</p>
            {report.image && (
              <img src={report.image} alt="Anexo" className="mt-4 w-full max-h-80 object-cover rounded-lg border border-neutral-200" />
            )}
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <div style={{ fontWeight: 600 }}>Linha do tempo</div>
            <ol className="mt-4 relative border-l border-neutral-200 ml-2">
              {report.timeline.map((t, i) => (
                <li key={i} className="ml-5 pb-5 last:pb-0">
                  <span className="absolute -left-1.5 w-3 h-3 rounded-full bg-neutral-900" />
                  <div className="text-xs text-neutral-500">{new Date(t.date).toLocaleString("pt-BR")} · {t.author}</div>
                  <div className="text-sm mt-0.5" style={{ fontWeight: 500 }}>{t.title}</div>
                  <div className="text-sm text-neutral-600">{t.description}</div>
                </li>
              ))}
            </ol>
          </div>

          {report.responses && report.responses.length > 0 && (
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <div style={{ fontWeight: 600 }}>Resposta da administração</div>
              {report.responses.map((r, i) => (
                <div key={i} className="mt-3 rounded-md border border-neutral-200 bg-neutral-50 p-4">
                  <div className="text-xs text-neutral-500">{r.author} · {new Date(r.date).toLocaleString("pt-BR")}</div>
                  <p className="text-sm text-neutral-700 mt-1">{r.text}</p>
                </div>
              ))}
            </div>
          )}

          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <div style={{ fontWeight: 600 }}>Adicionar informação complementar</div>
            <p className="text-xs text-neutral-500 mt-1">Inclua novas evidências ou observações úteis para a análise.</p>
            <Textarea rows={3} className="mt-3" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Escreva sua mensagem..." />
            <div className="mt-3 flex justify-end">
              <Button disabled={!comment.trim()} onClick={() => setComment("")}><MessageSquare className="w-4 h-4 mr-2" /> Enviar comentário</Button>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-neutral-200 bg-white p-5 space-y-3">
            <SideRow icon={MapPin} label="Endereço" value={`${report.address}${report.district ? " · " + report.district : ""}`} />
            <SideRow icon={Calendar} label="Registrada em" value={new Date(report.createdAt).toLocaleString("pt-BR")} />
            <SideRow icon={Calendar} label="Última atualização" value={new Date(report.updatedAt).toLocaleString("pt-BR")} />
            <SideRow icon={User} label="Responsável" value={report.assignee ?? "A definir"} />
            <SideRow icon={FileText} label="Protocolo" value={<span className="font-mono">{report.protocol}</span>} />
          </div>
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700">
            Esta ocorrência é acompanhada de forma transparente. Todos os registros desta página são auditáveis pela equipe responsável.
          </div>
        </aside>
      </div>
    </div>
  );
}

function SideRow({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-neutral-500 mt-0.5" />
      <div className="min-w-0">
        <div className="text-xs text-neutral-500">{label}</div>
        <div className="text-sm break-words">{value}</div>
      </div>
    </div>
  );
}

export function History() {
  const { reports, user, navigate } = useStore();
  const my = reports.filter((r) => r.authorEmail === user?.email);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [period, setPeriod] = useState<string>("all");
  const [sort, setSort] = useState<string>("recent");

  let filtered = my.filter((r) => {
    if (q && !`${r.title} ${r.protocol} ${r.description}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (categoryFilter !== "all" && r.category !== categoryFilter) return false;
    if (period !== "all") {
      const days = parseInt(period);
      const diff = (Date.now() - new Date(r.createdAt).getTime()) / 86400000;
      if (diff > days) return false;
    }
    return true;
  });
  filtered = [...filtered].sort((a, b) => sort === "recent" ? +new Date(b.createdAt) - +new Date(a.createdAt) : +new Date(a.createdAt) - +new Date(b.createdAt));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 600 }}>Histórico de denúncias</h1>
          <p className="text-sm text-neutral-600 mt-1">Consulte todas as ocorrências que você registrou.</p>
        </div>
        <Button onClick={() => navigate({ name: "new-report" })}>Nova denúncia</Button>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-4 grid md:grid-cols-5 gap-3">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por título, protocolo ou descrição" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {Object.entries(STATUS_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger><SelectValue placeholder="Categoria" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger><SelectValue placeholder="Período" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Qualquer data</SelectItem>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger><Filter className="w-4 h-4" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Mais recentes</SelectItem>
              <SelectItem value="old">Mais antigas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <Empty title="Nenhuma denúncia encontrada" description="Ajuste os filtros ou registre uma nova ocorrência." />
      ) : (
        <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-xs uppercase text-neutral-500">
              <tr>
                <th className="text-left px-4 py-3">Protocolo</th>
                <th className="text-left px-4 py-3">Título</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Categoria</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Local</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Data</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-neutral-50 cursor-pointer" onClick={() => navigate({ name: "report-detail", id: r.id })}>
                  <td className="px-4 py-3 font-mono text-xs">{r.protocol}</td>
                  <td className="px-4 py-3" style={{ fontWeight: 500 }}>{r.title}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-neutral-600">{CATEGORY_LABELS[r.category]}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-neutral-600">{r.district}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-neutral-600">{new Date(r.createdAt).toLocaleDateString("pt-BR")}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} size="sm" /></td>
                  <td className="px-4 py-3 text-right text-neutral-400">→</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
            <span>{filtered.length} ocorrência(s)</span>
            <span>Página 1 de 1</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function Empty({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-12 text-center">
      <Inbox className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
      <div style={{ fontWeight: 600 }}>{title}</div>
      {description && <p className="text-sm text-neutral-600 mt-1">{description}</p>}
    </div>
  );
}
