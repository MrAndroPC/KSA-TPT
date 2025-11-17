// src/state/thrustersStore.ts
import { create } from "zustand";
import { Thruster, makeDefaultThruster } from "../lib/thrusterSchema";

interface ThrustersState {
  thrusters: Thruster[];
  selectedId: string | null;
  addThruster: () => void;
  updateThruster: (id: string, patch: Partial<Thruster>) => void;
  setSelected: (id: string | null) => void;
  removeThruster: (id: string) => void;
  resetThrusterRotation: (id: string) => void;
}
//eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useThrustersStore = create<ThrustersState>((set, get) => ({
  thrusters: [],
  selectedId: null,

  addThruster: () =>
    set((state) => {
      const nextIndex = state.thrusters.length + 1;
      const t = makeDefaultThruster(nextIndex);
      return {
        thrusters: [...state.thrusters, t],
        selectedId: t.id,
      };
    }),

  updateThruster: (id, patch) =>
    set((state) => ({
      thrusters: state.thrusters.map((t) =>
        t.id === id ? { ...t, ...patch } : t
      ),
    })),

  setSelected: (id) => set({ selectedId: id }),

  removeThruster: (id) =>
    set((state) => ({
      thrusters: state.thrusters.filter((t) => t.id !== id),
      selectedId:
        state.selectedId === id ? null : state.selectedId,
    })),

  resetThrusterRotation: (id) =>
    set((state) => ({
      thrusters: state.thrusters.map((t) =>
        t.id === id
          ? {
              ...t,
              // default direction: exhaust along X-
              exhaustDirection: { x: -1, y: 0, z: 0 },
            }
          : t
      ),
    })),
}));
