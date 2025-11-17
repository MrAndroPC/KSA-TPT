// src/components/ThrusterGizmo.tsx
import React, { useEffect, useRef } from "react";
import { TransformControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Group, Quaternion, Vector3, Mesh } from "three";
import { useThrustersStore } from "../state/thrustersStore";
import { useEditorStore } from "../state/editorStore";
import type { Thruster } from "../lib/thrusterSchema";

interface Props {
  thrusterId: string;
}

// In gizmo local space, (-1, 0, 0) is the exhaust direction (nozzle pointing "back")
// Matching: To thrust forward, ExhaustDirection = (-1, 0, 0)
const EXHAUST_LOCAL_AXIS = new Vector3(-1, 0, 0);

export const ThrusterGizmo: React.FC<Props> = ({ thrusterId }) => {
  const { camera, gl } = useThree();
  const thrusters = useThrustersStore((s) => s.thrusters);
  const thruster = thrusters.find((t) => t.id === thrusterId) as Thruster | undefined;
  const updateThruster = useThrustersStore((s) => s.updateThruster);
  const setSelected = useThrustersStore((s) => s.setSelected);
  const transformMode = useEditorStore((s) => s.transformMode); // "translate" | "rotate"

  const groupRef = useRef<Group>(null!);
  const coneRef = useRef<Mesh>(null!);

  // Sync gizmo transform from thruster state
  useEffect(() => {
    if (!thruster || !groupRef.current) return;

    const g = groupRef.current;

    // Position in part coordinates
    g.position.set(thruster.location.x, thruster.location.y, thruster.location.z);

    // Orientation: rotate EXHAUST_LOCAL_AXIS to thruster.exhaustDirection
    const dir = new Vector3(
      thruster.exhaustDirection.x,
      thruster.exhaustDirection.y,
      thruster.exhaustDirection.z
    ).normalize();

    if (dir.lengthSq() === 0) {
      // Avoid NaNs; default to exhaust backward
      dir.set(-1, 0, 0);
    }

    const q = new Quaternion().setFromUnitVectors(EXHAUST_LOCAL_AXIS, dir);
    g.quaternion.copy(q);
  }, [
    thruster?.id,
    thruster?.location.x,
    thruster?.location.y,
    thruster?.location.z,
    thruster?.exhaustDirection.x,
    thruster?.exhaustDirection.y,
    thruster?.exhaustDirection.z,
  ]);

  // Orient cone geometry to visually point along (-1, 0, 0) in local space
  useEffect(() => {
    if (!coneRef.current) return;
    // ConeGeometry by default points along +Y, so rotate it to point along -X. [web:2][web:124][web:135]
    coneRef.current.rotation.set(0, 0, 0);
    // First point along +Y -> +X, then flip to -X
    // Simplest: rotate so +Y -> -X: rotateZ(-Math.PI / 2)
    coneRef.current.rotation.z = -Math.PI / 2;
  }, []);

  if (!thruster) return null;

  const commitTransformToState = () => {
    if (!groupRef.current) return;

    const g = groupRef.current;
    const p = g.position.clone();
    const q = g.quaternion.clone();

    // ExhaustDirection is EXHAUST_LOCAL_AXIS transformed by the gizmo's quaternion
    const dir = EXHAUST_LOCAL_AXIS.clone().applyQuaternion(q).normalize();

    updateThruster(thrusterId, {
      location: { x: p.x, y: p.y, z: p.z },
      exhaustDirection: { x: dir.x, y: dir.y, z: dir.z },
    });
  };

  return (
    <TransformControls
      object={groupRef}
      camera={camera}
      domElement={gl.domElement}
      mode={transformMode}
      onMouseDown={() => setSelected(thrusterId)}
      onMouseUp={commitTransformToState}
    >
      <group ref={groupRef}>
        {/* Sphere at thruster location */}
        <mesh>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="orange" />
        </mesh>

        {/* Cone offset along local -X to show exhaustDirection visually */}
        <mesh ref={coneRef} position={[-0.15, 0, 0]}>
          <coneGeometry args={[0.04, 0.3, 16]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
      </group>
    </TransformControls>
  );
};
