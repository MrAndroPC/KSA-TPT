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
    <div className="toolbar">
      <span className="toolbar-label">Gizmo mode:</span>
      <div className="toolbar-group">
        <button
          onClick={() => setMode("translate")}
          className={mode === "translate" ? "active" : ""}
        >
          T / Translate
        </button>
        <button
          onClick={() => setMode("rotate")}
          className={mode === "rotate" ? "active" : ""}
        >
          R / Rotate
        </button>
      </div>
    </div>
  );
};

export default TransformModeToolbar;