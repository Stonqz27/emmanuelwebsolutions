import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
}
