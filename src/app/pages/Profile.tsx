import { useState } from "react";
import { useStore } from "../lib/store";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { LogOut, ShieldCheck } from "lucide-react";

export function Profile() {
  const { user, logout, reports } = useStore();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [district, setDistrict] = useState(user?.district ?? "");
  const my = reports.filter((r) => r.authorEmail === user?.email);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-neutral-900 text-white grid place-items-center" style={{ fontSize: 18, fontWeight: 600 }}>
            {user?.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 600 }}>{user?.name}</h1>
            <div className="text-sm text-neutral-600">{user?.email}</div>
            <div className="text-xs text-neutral-500 mt-0.5">Membro desde {user?.joinedAt && new Date(user.joinedAt).toLocaleDateString("pt-BR")}</div>
          </div>
        </div>
        <Button variant="outline" onClick={logout}><LogOut className="w-4 h-4 mr-2" /> Sair</Button>
      </div>

      <Tabs defaultValue="dados">
        <TabsList>
          <TabsTrigger value="dados">Dados pessoais</TabsTrigger>
          <TabsTrigger value="notif">Notificações</TabsTrigger>
          <TabsTrigger value="seg">Segurança</TabsTrigger>
          <TabsTrigger value="atv">Atividade</TabsTrigger>
        </TabsList>

        <TabsContent value="dados">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5"><Label>Nome completo</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div className="space-y-1.5"><Label>E-mail</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Telefone</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Bairro</Label><Input value={district} onChange={(e) => setDistrict(e.target.value)} /></div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Salvar alterações</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notif">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-4">
            {[
              { t: "Atualizações de status", d: "Receber notificação quando o status de uma denúncia mudar." },
              { t: "Respostas da administração", d: "Receber notificação quando houver resposta institucional." },
              { t: "Lembretes", d: "Receber lembretes sobre denúncias pendentes de complementação." },
              { t: "Comunicados oficiais", d: "Receber comunicados periódicos da gestão." },
            ].map((p, i) => (
              <div key={p.t} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                <div>
                  <div className="text-sm" style={{ fontWeight: 500 }}>{p.t}</div>
                  <div className="text-xs text-neutral-500">{p.d}</div>
                </div>
                <Switch defaultChecked={i < 2} />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="seg">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-5">
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <ShieldCheck className="w-5 h-5" /> Sua conta possui proteção padrão. Recomendamos ativar a verificação em duas etapas.
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5"><Label>Senha atual</Label><Input type="password" /></div>
              <div className="space-y-1.5"><Label>Nova senha</Label><Input type="password" /></div>
              <div className="space-y-1.5"><Label>Confirmar nova senha</Label><Input type="password" /></div>
            </div>
            <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
              <div>
                <div className="text-sm" style={{ fontWeight: 500 }}>Verificação em duas etapas</div>
                <div className="text-xs text-neutral-500">Camada adicional de segurança no login.</div>
              </div>
              <Switch />
            </div>
            <div className="flex justify-end"><Button>Atualizar senha</Button></div>
          </div>
        </TabsContent>

        <TabsContent value="atv">
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <ul className="divide-y divide-neutral-100">
              {my.slice(0, 5).map((r) => (
                <li key={r.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm" style={{ fontWeight: 500 }}>{r.title}</div>
                    <div className="text-xs text-neutral-500">{r.protocol} · {new Date(r.createdAt).toLocaleDateString("pt-BR")}</div>
                  </div>
                  <span className="text-xs text-neutral-500">{new Date(r.updatedAt).toLocaleDateString("pt-BR")}</span>
                </li>
              ))}
              {my.length === 0 && <li className="text-sm text-neutral-500 py-6 text-center">Nenhuma atividade recente.</li>}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
