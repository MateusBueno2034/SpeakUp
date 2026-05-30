import { ThemeProvider } from "next-themes";
import { StoreProvider, useStore } from "./lib/store";
import { AppShell } from "./components/AppShell";
import { Landing } from "./pages/Landing";
import { Login, Register, ForgotPassword } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { NewReport } from "./pages/NewReport";
import { ReportSent, ReportDetail, History } from "./pages/ReportPages";
import { Profile } from "./pages/Profile";
import { MapView } from "./pages/MapView";
import { AdminDashboard, AdminReports, AdminDetail } from "./pages/Admin";
import { Toaster } from "./components/ui/sonner";

function Router() {
  const { route, user, isAdmin } = useStore();

  if (route.name === "landing") return <Landing />;
  if (route.name === "login") return <Login />;
  if (route.name === "register") return <Register />;
  if (route.name === "forgot") return <ForgotPassword />;

  if (!user) return <Login />;

  if (route.name === "admin-dashboard") return <AppShell mode="admin"><AdminDashboard /></AppShell>;
  if (route.name === "admin-reports") return <AppShell mode="admin"><AdminReports /></AppShell>;
  if (route.name === "admin-detail") return <AppShell mode="admin"><AdminDetail id={route.id} /></AppShell>;
  if (route.name === "admin-map") return <AppShell mode="admin"><MapView adminMode /></AppShell>;

  const inner = (() => {
    switch (route.name) {
      case "dashboard": return <Dashboard />;
      case "new-report": return <NewReport />;
      case "report-sent": return <ReportSent id={route.id} />;
      case "report-detail": return <ReportDetail id={route.id} />;
      case "history": return <History />;
      case "profile": return <Profile />;
      case "map": return <MapView />;
      default: return <Dashboard />;
    }
  })();

  return <AppShell mode={isAdmin ? "admin" : "user"}>{inner}</AppShell>;
}

export default function App() {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem
      defaultTheme="system"
      storageKey="speakup-theme"
      disableTransitionOnChange
    >
      <StoreProvider>
        <Router />
        <Toaster />
      </StoreProvider>
    </ThemeProvider>
  );
}
