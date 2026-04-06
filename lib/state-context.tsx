"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { AppState, Session } from "./types";
import { defaultState, loadState, saveState, addSession, today } from "./state";

interface StateContextValue {
  state: AppState;
  recordSession: (session: Session) => void;
}

const StateContext = createContext<StateContextValue | null>(null);

export function StateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState(loadState());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveState(state);
  }, [state, mounted]);

  function recordSession(session: Session) {
    setState((prev) => {
      const updated = addSession(prev, session);
      const isConsecutive =
        prev.last_reset_date === yesterday() || prev.last_reset_date === null;
      const isNewDay = prev.last_reset_date !== today();

      return {
        ...updated,
        streak: isNewDay ? (isConsecutive ? prev.streak + 1 : 1) : prev.streak,
        last_reset_date: today(),
      };
    });
  }

  return (
    <StateContext.Provider value={{ state, recordSession }}>
      {children}
    </StateContext.Provider>
  );
}

export function useAppState(): StateContextValue {
  const ctx = useContext(StateContext);
  if (!ctx) throw new Error("useAppState must be inside StateProvider");
  return ctx;
}

function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
