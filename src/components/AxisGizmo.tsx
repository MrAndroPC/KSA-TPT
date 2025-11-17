// src/components/AxisGizmo.tsx
import React, { useMemo } from "react";
import { GizmoHelper } from "@react-three/drei";
import { useEditorStore } from "../state/editorStore";

export const AxisGizmo: React.FC = () => {
  const setAxisView = useEditorStore((s) => s.setAxisView);

  // Create buffer arrays once [web:181][web:182]
  const xAxisPoints = useMemo(() => new Float32Array([-1, 0, 0, 1, 0, 0]), []);
  const yAxisPoints = useMemo(() => new Float32Array([0, -1, 0, 0, 1, 0]), []);
  const zAxisPoints = useMemo(() => new Float32Array([0, 0, -1, 0, 0, 1]), []);

  return (
    <GizmoHelper alignment="top-right" margin={[80, 80]}>
      <group scale={60.5}>
        {/* X axis (front/back) */}
        <mesh
          position={[1, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            setAxisView("front"); // +X
          }}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="red" />
        </mesh>
        <mesh
          position={[-1, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            setAxisView("back"); // -X
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
            setAxisView("right"); // +Y
          }}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="green" />
        </mesh>
        <mesh
          position={[0, -1, 0]}
          onClick={(e) => {
            e.stopPropagation();
            setAxisView("left"); // -Y
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
            setAxisView("top"); // +Z
          }}
        >
          <sphereGeometry args={[0.2, 16, 16]}  />
          <meshBasicMaterial color="blue" />
        </mesh>
        <mesh
          position={[0, 0, -1]}
          onClick={(e) => {
            e.stopPropagation();
            setAxisView("bottom"); // -Z
          }}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="darkblue" />
        </mesh>

        {/* Axis lines - corrected syntax */}
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
