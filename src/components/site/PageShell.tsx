import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="pt-14">{children}</main>
      <Footer />
    </>
  );
}
