"use client";

import { StateProvider } from "@/lib/state-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <StateProvider>{children}</StateProvider>;
}
