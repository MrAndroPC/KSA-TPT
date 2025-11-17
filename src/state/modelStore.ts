// src/state/modelStore.ts
import { create } from "zustand";
import type { Object3D } from "three";

interface ModelState {
  glbUrl: string | null;
  rootScene: Object3D | null;
  meanRadius: number | null;          // bounding sphere radius
  setGlbUrl: (url: string | null) => void;
  setRootScene: (scene: Object3D | null) => void;
  setMeanRadius: (radius: number | null) => void;
}

export const useModelStore = create<ModelState>((set) => ({
  glbUrl: null,
  rootScene: null,
  meanRadius: null,
  setGlbUrl: (glbUrl) => set({ glbUrl }),
  setRootScene: (rootScene) => set({ rootScene }),
  setMeanRadius: (meanRadius) => set({ meanRadius }),
}));
