// src/components/ViewportCanvas.tsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { SceneRoot } from "./SceneRoot";

export const ViewportCanvas: React.FC = () => {
  return (
    <div className="viewport">
      <Canvas camera={{ position: [4, 3, 6], fov: 50 }}>
        <SceneRoot />
      </Canvas>
    </div>
  );
};
