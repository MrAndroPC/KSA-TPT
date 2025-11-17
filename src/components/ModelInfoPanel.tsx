// src/components/ModelInfoPanel.tsx
import React from "react";
import { useModelStore } from "../state/modelStore";

export const ModelInfoPanel: React.FC = () => {
  const meanRadius = useModelStore((s) => s.meanRadius);

  if (meanRadius == null) {
    return <div>Mean radius: n/a</div>;
  }

  return (
    <div>
      Mean radius: {meanRadius.toFixed(3)} m
    </div>
  );
};
