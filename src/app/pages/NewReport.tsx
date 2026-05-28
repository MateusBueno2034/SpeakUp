import { useState } from "react";
import { useStore } from "../lib/store";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../components/ui/dialog";
import { CATEGORY_LABELS, PRIORITY_LABELS, type ReportCategory, type ReportPriority } from "../lib/types";
import { Upload, X, MapPin, CheckCircle2, Save } from "lucide-react";

export function NewReport() {
  const { addReport, navigate } = useStore();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState<ReportCategory | undefined>(undefined);
  const [priority, setPriority] = useState<ReportPriority>("media");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  const canSubmit = title.length >= 6 && desc.length >= 15 && category && address.length >= 5;

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  }

  function submit() {
    if (!canSubmit) return;
    const created = addReport({
      title,
      description: desc,
      category: category as ReportCategory,
      priority,
      address,
      district,
      notes,
      image: image ?? undefined,
      coords: { x: 30 + Math.random() * 50, y: 30 + Math.random() * 40 },
    });
    setConfirmOpen(false);
    navigate({ name: "report-sent", id: created.id });
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <div className="text-sm text-neutral-500">Nova denúncia</div>
        <h1 style={{ fontSize: 26, fontWeight: 600 }}>Registrar uma ocorrência urbana</h1>
        <p className="text-sm text-neutral-600 mt-1">Preencha os campos abaixo. Quanto mais clara for a descrição, mais rápida tende a ser a análise.</p>
      </div>

      {draftSaved && (
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Rascunho salvo localmente. Você pode continuar mais tarde.
        </div>
      )}

      <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-5">
        <div className="space-y-1.5">
          <Label>Título da ocorrência *</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Buraco no asfalto impedindo passagem" />
          <p className="text-xs text-neutral-500">Resuma o problema em uma frase clara e concisa.</p>
        </div>

        <div className="space-y-1.5">
          <Label>Descrição detalhada *</Label>
          <Textarea rows={5} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Descreva detalhes: localização exata, há quanto tempo ocorre, dimensões ou impactos para pedestres e veículos. Quanto mais informação, mais rápida a análise." />
          <div className="flex justify-between text-xs text-neutral-500">
            <span>Inclua pontos de referência.</span>
            <span>{desc.length} caracteres</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <Label>Categoria *</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as ReportCategory)}>
              <SelectTrigger><SelectValue placeholder="Selecione a categoria" /></SelectTrigger>
              <SelectContent>
                {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Prioridade</Label>
            <RadioGroup value={priority} onValueChange={(v) => setPriority(v as ReportPriority)} className="flex gap-2">
              {(Object.keys(PRIORITY_LABELS) as ReportPriority[]).map((p) => (
                <label key={p} className={`flex-1 flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm cursor-pointer ${priority === p ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200"}`}>
                  <RadioGroupItem value={p} className="sr-only" />
                  {PRIORITY_LABELS[p]}
                </label>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-5">
        <div>
          <div style={{ fontWeight: 600 }}>Localização</div>
          <div className="text-xs text-neutral-500">Informe o endereço aproximado da ocorrência.</div>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Endereço *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input className="pl-9" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Rua, número e ponto de referência" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Bairro / Região</Label>
            <Input value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="Opcional" />
          </div>
          <div className="space-y-1.5">
            <Label>Observações adicionais</Label>
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Opcional" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 space-y-4">
        <div>
          <div style={{ fontWeight: 600 }}>Imagem ilustrativa</div>
          <div className="text-xs text-neutral-500">Anexe uma foto para auxiliar a análise (opcional).</div>
        </div>
        {image ? (
          <div className="relative rounded-lg overflow-hidden border border-neutral-200">
            <img src={image} className="w-full max-h-72 object-cover" alt="Pré-visualização" />
            <button onClick={() => setImage(null)} className="absolute top-2 right-2 bg-white/95 border border-neutral-200 rounded-md p-1.5 text-neutral-700"><X className="w-4 h-4" /></button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 rounded-lg p-8 cursor-pointer hover:bg-neutral-50">
            <Upload className="w-5 h-5 text-neutral-400 mb-2" />
            <div className="text-sm text-neutral-700">Clique para selecionar uma imagem</div>
            <div className="text-xs text-neutral-500">PNG ou JPG, até 5MB</div>
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 justify-end">
        <Button variant="ghost" onClick={() => navigate({ name: "dashboard" })}>Cancelar</Button>
        <Button variant="outline" onClick={() => { setDraftSaved(true); setTimeout(() => setDraftSaved(false), 4000); }}>
          <Save className="w-4 h-4 mr-2" /> Salvar rascunho
        </Button>
        <Button disabled={!canSubmit} onClick={() => setConfirmOpen(true)}>Enviar denúncia</Button>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar envio da denúncia</DialogTitle>
            <DialogDescription>
              Revise os dados abaixo. Após o envio, será gerado um número de protocolo oficial.
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm space-y-2 border border-neutral-200 rounded-lg p-4 bg-neutral-50">
            <div><span className="text-neutral-500">Título:</span> {title}</div>
            <div><span className="text-neutral-500">Categoria:</span> {category && CATEGORY_LABELS[category as ReportCategory]}</div>
            <div><span className="text-neutral-500">Prioridade:</span> {PRIORITY_LABELS[priority]}</div>
            <div><span className="text-neutral-500">Endereço:</span> {address} {district && `· ${district}`}</div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Revisar</Button>
            <Button onClick={submit}>Confirmar envio</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
