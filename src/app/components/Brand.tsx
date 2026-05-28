import { useStore } from "../lib/store";

export function Brand({ className = "" }: { className?: string }) {
  const { navigate } = useStore();

  return (
    <button
      type="button"
      onClick={() => navigate({ name: "landing" })}
      className={`flex items-center gap-2 ${className} text-left cursor-pointer`}
    >
      <div className="w-7 h-7 rounded-md bg-neutral-900 text-white grid place-items-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11a8 8 0 0 1 16 0v3a8 8 0 0 1-8 8H6a3 3 0 0 1-3-3z"/><path d="M9 11h6M9 15h4"/></svg>
      </div>
      <span className="tracking-tight" style={{ fontWeight: 600, fontSize: 17 }}>SpeakUp</span>
    </button>
  );
}
