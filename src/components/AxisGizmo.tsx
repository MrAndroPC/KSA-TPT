// src/components/AxisGizmo.tsx
import React, { useMemo } from "react";
import { GizmoHelper } from "@react-three/drei";
import { useEditorStore } from "../state/editorStore";
import type { AxisView } from "../state/editorStore";

export const AxisGizmo: React.FC = () => {
  const axisView = useEditorStore((s) => s.axisView);
  const setAxisView = useEditorStore((s) => s.setAxisView);

  // Create buffer arrays once
  const xAxisPoints = useMemo(() => new Float32Array([-1, 0, 0, 1, 0, 0]), []);
  const yAxisPoints = useMemo(() => new Float32Array([0, -1, 0, 0, 1, 0]), []);
  const zAxisPoints = useMemo(() => new Float32Array([0, 0, -1, 0, 0, 1]), []);

  // Helper: toggle to opposite if clicking current axis, else set new axis [web:163][web:115]
  const handleAxisClick = (target: AxisView, opposite: AxisView) => {
    if (axisView === target) {
      setAxisView(opposite); // flip to opposite
    } else {
      setAxisView(target);
    }
  };

  return (
    <GizmoHelper alignment="top-right" margin={[80, 80]}>
      <group scale={60.5}>
        {/* X axis (front/back) */}
        <mesh
          position={[1, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            handleAxisClick("front", "back"); // +X ↔ -X
          }}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="red" />
        </mesh>
        <mesh
          position={[-1, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            handleAxisClick("back", "front"); // -X ↔ +X
          }}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="darkred" />
        </mesh>

        {/* Y axis (right/left) */}
        <mesh
          position={[0, 1, 0]}
          onClick={(e) => {
            e.stopPropagation();
            handleAxisClick("right", "left"); // +Y ↔ -Y
          }}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="green" />
        </mesh>
        <mesh
          position={[0, -1, 0]}
          onClick={(e) => {
            e.stopPropagation();
            handleAxisClick("left", "right"); // -Y ↔ +Y
          }}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="darkgreen" />
        </mesh>

        {/* Z axis (up/down) */}
        <mesh
          position={[0, 0, 1]}
          onClick={(e) => {
            e.stopPropagation();
            handleAxisClick("top", "bottom"); // +Z ↔ -Z
          }}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="blue" />
        </mesh>
        <mesh
          position={[0, 0, -1]}
          onClick={(e) => {
            e.stopPropagation();
            handleAxisClick("bottom", "top"); // -Z ↔ +Z
          }}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="darkblue" />
        </mesh>

        {/* Axis lines */}
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[xAxisPoints, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="red" />
        </line>
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[yAxisPoints, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="green" />
        </line>
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[zAxisPoints, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="blue" />
        </line>
      </group>
    </GizmoHelper>
  );
};
