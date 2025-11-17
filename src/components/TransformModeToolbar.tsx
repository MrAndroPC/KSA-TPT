// src/components/TransformModeToolbar.tsx
import React, { useEffect } from "react";
import { useEditorStore } from "../state/editorStore";

export const TransformModeToolbar: React.FC = () => {
  const mode = useEditorStore((s) => s.transformMode);
  const setMode = useEditorStore((s) => s.setTransformMode);

  // Optional: keyboard shortcuts (T/R) [web:78][web:69]
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "t" || e.key === "T") setMode("translate");
      if (e.key === "r" || e.key === "R") setMode("rotate");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setMode]);

  return (
    <div style={{ marginBottom: "0.5rem" }}>
      <span style={{ marginRight: "0.5rem" }}>Gizmo mode:</span>
      <button
        onClick={() => setMode("translate")}
        style={{ fontWeight: mode === "translate" ? "bold" : "normal" }}
      >
        T / Translate
      </button>
      <button
        onClick={() => setMode("rotate")}
        style={{ marginLeft: "0.25rem", fontWeight: mode === "rotate" ? "bold" : "normal" }}
      >
        R / Rotate
      </button>
    </div>
  );
};

export default TransformModeToolbar;