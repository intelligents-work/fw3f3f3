import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { defaultScenario, simulate, type Scenario, type Simulation } from "./engine";

interface Ctx {
  scenario: Scenario;
  setScenario: (patch: Partial<Scenario>) => void;
  applyPreset: (patch: Partial<Scenario>) => void;
  sim: Simulation;
  chatOpen: boolean;
  setChatOpen: (v: boolean) => void;
}

const PlatformCtx = createContext<Ctx | null>(null);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [scenario, setScenarioState] = useState<Scenario>(defaultScenario);
  const [chatOpen, setChatOpen] = useState(false);

  const setScenario = (patch: Partial<Scenario>) =>
    setScenarioState(s => ({ ...s, ...patch }));

  const sim = useMemo(() => simulate(scenario), [scenario]);

  return (
    <PlatformCtx.Provider value={{ scenario, setScenario, applyPreset: setScenario, sim, chatOpen, setChatOpen }}>
      {children}
    </PlatformCtx.Provider>
  );
}

export function usePlatform() {
  const c = useContext(PlatformCtx);
  if (!c) throw new Error("usePlatform must be inside PlatformProvider");
  return c;
}
