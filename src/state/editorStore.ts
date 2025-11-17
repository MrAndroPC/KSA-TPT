// src/state/editorStore.ts
import { create } from "zustand";

export type TransformMode = "translate" | "rotate";
export type AxisView =
  | "none"
  | "front"   // +X
  | "back"    // -X
  | "right"   // +Y
  | "left"    // -Y
  | "top"     // +Z
  | "bottom"; // -Z

interface EditorState {
  transformMode: TransformMode;
  setTransformMode: (mode: TransformMode) => void;

  axisView: AxisView;
  setAxisView: (view: AxisView) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  transformMode: "translate",
  setTransformMode: (mode) => set({ transformMode: mode }),

  axisView: "none",
  setAxisView: (axisView) => set({ axisView }),
}));
