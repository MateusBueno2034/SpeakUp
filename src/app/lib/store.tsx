import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import type { Report, Notification, Route, ReportStatus } from "./types";

interface User {
  name: string;
  email: string;
  phone?: string;
  district?: string;
  joinedAt: string;
}

interface Store {
  route: Route;
  navigate: (r: Route) => void;
  user: User | null;
  isAdmin: boolean;
  login: (email: string, asAdmin?: boolean) => void;
  logout: () => void;
  reports: Report[];
  addReport: (r: Omit<Report, "id" | "protocol" | "createdAt" | "updatedAt" | "timeline" | "status" | "authorName" | "authorEmail">) => Report;
  updateReportStatus: (id: string, status: ReportStatus, note?: string) => void;
  addResponse: (id: string, text: string) => void;
  notifications: Notification[];
  markNotificationsRead: () => void;
}

const StoreContext = createContext<Store | null>(null);

const initialReports: Report[] = [];

const initialNotifications: Notification[] = [];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>({ name: "landing" });
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const value = useMemo<Store>(() => ({
    route,
    navigate: (r) => { setRoute(r); window.scrollTo(0, 0); },
    user,
    isAdmin,
    login: (email, asAdmin = false) => {
      setUser({
        name: asAdmin ? "Administrador" : "Usuário",
        email,
        phone: "",
        district: "",
        joinedAt: new Date().toISOString().slice(0, 10),
      });
      setIsAdmin(asAdmin);
    },
    logout: () => { setUser(null); setIsAdmin(false); setRoute({ name: "landing" }); },
    reports,
    addReport: (r) => {
      const seq = String(2000 + reports.length).padStart(4, "0");
      const protocol = `SPK-2026-${seq}`;
      const id = `r${reports.length + 100}`;
      const now = new Date().toISOString();
      const created: Report = {
        ...r,
        id,
        protocol,
        status: "recebida",
        createdAt: now,
        updatedAt: now,
        authorName: user?.name ?? "Cidadão",
        authorEmail: user?.email ?? "",
        timeline: [
          { date: now, status: "recebida", title: "Denúncia recebida", description: "Protocolo gerado e encaminhado para triagem.", author: "Sistema" },
        ],
      };
      setReports((rs) => [created, ...rs]);
      setNotifications((ns) => [
        { id: `n${Date.now()}`, title: "Denúncia recebida", message: `Protocolo ${protocol} registrado com sucesso.`, date: now, read: false, type: "confirmacao" },
        ...ns,
      ]);
      return created;
    },
    updateReportStatus: (id, status, note) => {
      const now = new Date().toISOString();
      setReports((rs) => rs.map((r) => r.id === id ? {
        ...r,
        status,
        updatedAt: now,
        timeline: [...r.timeline, { date: now, status, title: `Status atualizado: ${status}`, description: note ?? "Atualização administrativa.", author: "Administração" }],
      } : r));
    },
    addResponse: (id, text) => {
      const now = new Date().toISOString();
      setReports((rs) => rs.map((r) => r.id === id ? {
        ...r,
        updatedAt: now,
        responses: [...(r.responses ?? []), { author: "Administração", date: now, text }],
      } : r));
    },
    notifications,
    markNotificationsRead: () => setNotifications((ns) => ns.map((n) => ({ ...n, read: true }))),
  }), [route, user, isAdmin, reports, notifications]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
