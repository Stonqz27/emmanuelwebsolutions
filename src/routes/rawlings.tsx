import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/rawlings")({
  head: () => ({ meta: [
    { title: "HallOS V10 — Rawlings | Emmanuel Web Solutions" },
    { name: "description", content: "The original complete HallOS V10 residence hall app running in demo mode." },
    { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: HallOSFull,
});
function HallOSFull() {
  return <main style={{minHeight:"100dvh",background:"#101827",margin:0}}>
    <iframe title="HallOS V10 — full app" src="/rawlings/app/" style={{display:"block",width:"100%",height:"100dvh",border:0}} allow="camera" />
  </main>;
}
