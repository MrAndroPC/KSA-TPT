// src/components/SceneRoot.tsx
import React, { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Vector3, PerspectiveCamera } from "three";
import { AxisGizmo } from "./AxisGizmo";
import { LoadedModel } from "./LoadedModel";
import { ThrustersGizmos } from "./ThrustersGizmos";
import { useEditorStore } from "../state/editorStore";
import { useModelStore } from "../state/modelStore";
import { useThrustersStore } from "../state/thrustersStore";

export const SceneRoot: React.FC = () => {
  const threeCamera = useThree((state) => state.camera as PerspectiveCamera);
  const cameraRef = useRef<PerspectiveCamera | null>(threeCamera);
  const controlsRef = useRef<OrbitControlsImpl>(null!);

  const axisView = useEditorStore((s) => s.axisView);
  const meanRadius = useModelStore((s) => s.meanRadius) ?? 1;
  const glbUrl = useModelStore((s) => s.glbUrl);
  
  const selectedId = useThrustersStore((s) => s.selectedId);
  const thrusters = useThrustersStore((s) => s.thrusters);
  const selectedThruster = thrusters.find((t) => t.id === selectedId);

  const lockedPolarRef = useRef(0);
  const lockedAzimuthRef = useRef(0);
  const snappingRef = useRef(false);
  const snapTimestampRef = useRef(0); // timestamp when snap completes [web:184][web:189]

  useEffect(() => {
    cameraRef.current = threeCamera;
  }, [threeCamera]);

  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    const controls = controlsRef.current;
    
    // Focus on selected thruster if available, otherwise on origin
    const target = selectedThruster
      ? new Vector3(selectedThruster.location.x, selectedThruster.location.y, selectedThruster.location.z)
      : new Vector3(0, 0, 0);
    
    const dist = meanRadius * 3;

    if (axisView === "none") {
      camera.fov = 50;
      camera.updateProjectionMatrix();
      snapTimestampRef.current = 0; // clear grace period [web:184]
      return;
    }

    snappingRef.current = true;

    const pos = new Vector3();
    switch (axisView) {
      case "front":
        pos.set(target.x + dist, target.y, target.z);
        break;
      case "back":
        pos.set(target.x - dist, target.y, target.z);
        break;
      case "right":
        pos.set(target.x, target.y + dist, target.z);
        break;
      case "left":
        pos.set(target.x, target.y - dist, target.z);
        break;
      case "top":
        pos.set(target.x, target.y, target.z + dist);
        break;
      case "bottom":
        pos.set(target.x, target.y, target.z - dist);
        break;
    }

    camera.position.copy(pos);
    if (controls) {
      controls.target.copy(target);
      controls.update();

      lockedPolarRef.current = controls.getPolarAngle();
      lockedAzimuthRef.current = controls.getAzimuthalAngle();
    } else {
      camera.lookAt(target);
      lockedPolarRef.current = 0;
      lockedAzimuthRef.current = 0;
    }

    camera.fov = 5;
    camera.updateProjectionMatrix();

    snappingRef.current = false;
    snapTimestampRef.current = Date.now(); // record snap time [web:184][web:189]
  }, [axisView, meanRadius, selectedThruster?.location.x, selectedThruster?.location.y, selectedThruster?.location.z]);

  return (
    <>
      <color attach="background" args={["#101014"]} />
      <ambientLight intensity={5} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />
      <gridHelper args={[100, 100]} position={[0, -0, 0]} />
      <axesHelper args={[2]} />

      {glbUrl && <LoadedModel url={glbUrl} />}
      <ThrustersGizmos />

      <AxisGizmo />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping={true}
        dampingFactor={0.3}
        rotateSpeed={1}
        onChange={() => {
          const { axisView, setAxisView } = useEditorStore.getState();
          if (axisView === "none") return;

          if (snappingRef.current) return; // ignore programmatic snap [web:184][web:189]

          // Grace period: ignore changes for 200ms after snap to avoid micro-movements during click [web:184][web:189]
          const gracePeriod = 200; // ms
          if (Date.now() - snapTimestampRef.current < gracePeriod) {
            return;
          }

          const controls = controlsRef.current;
          if (!controls) return;

          const polar = controls.getPolarAngle();
          const azimuth = controls.getAzimuthalAngle();

          const eps = 1e-3;

          const rotated =
            Math.abs(polar - lockedPolarRef.current) > eps ||
            Math.abs(azimuth - lockedAzimuthRef.current) > eps;

          if (rotated) {
            setAxisView("none");
          }
        }}
      />
    </>
  );
};
