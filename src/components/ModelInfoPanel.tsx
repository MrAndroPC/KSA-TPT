// src/components/ModelInfoPanel.tsx
import React from "react";
import { useModelStore } from "../state/modelStore";

export const ModelInfoPanel: React.FC = () => {
  const meanRadius = useModelStore((s) => s.meanRadius);

  return (
    <div className="info-display">
      <strong>Mean radius:</strong> {meanRadius != null ? `${meanRadius.toFixed(3)} m` : "n/a"}
    </div>
  );
};
