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

export const SceneRoot: React.FC = () => {
  // Get the R3F camera once per render; treat as immutable in this component. [web:188][web:197]
  const threeCamera = useThree((state) => state.camera as PerspectiveCamera);
  const cameraRef = useRef<PerspectiveCamera | null>(threeCamera);
  const controlsRef = useRef<OrbitControlsImpl>(null!);

  const axisView = useEditorStore((s) => s.axisView);
  const meanRadius = useModelStore((s) => s.meanRadius) ?? 1;
  const glbUrl = useModelStore((s) => s.glbUrl);

  // Keep ref in sync with the current three.js camera instance. [web:188][web:194]
  useEffect(() => {
    cameraRef.current = threeCamera;
  }, [threeCamera]);

  // Snap camera + pseudo-orthographic mode when axisView changes. [web:166][web:168][web:174][web:179]
  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    const controls = controlsRef.current;
    const target = new Vector3(0, 0, 0);
    const dist = meanRadius * 3;

    if (axisView === "none") {
      // Restore normal perspective [web:166][web:179]
      camera.fov = 50;
      camera.updateProjectionMatrix();
      return;
    }

    const pos = new Vector3();

    switch (axisView) {
      case "front":   // +X
        pos.set(dist, 0, 0);
        break;
      case "back":    // -X
        pos.set(-dist, 0, 0);
        break;
      case "right":   // +Y
        pos.set(0, dist, 0);
        break;
      case "left":    // -Y
        pos.set(0, -dist, 0);
        break;
      case "top":     // +Z
        pos.set(0, 0, dist);
        break;
      case "bottom":  // -Z
        pos.set(0, 0, -dist);
        break;
    }

    camera.position.copy(pos);
    if (controls) {
      controls.target.copy(target);
      controls.update();
    } else {
      camera.lookAt(target);
    }

    // Ortho-like view: narrow FOV while staying in perspective. [web:168][web:179][web:165]
    camera.fov = 5;
    camera.updateProjectionMatrix();
  }, [axisView, meanRadius]);

  return (
    <>
      <color attach="background" args={["#101014"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />
      <gridHelper args={[10, 10]} position={[0, -0.5, 0]} />
      <axesHelper args={[2]} />

      {glbUrl && <LoadedModel url={glbUrl} />}
      <ThrustersGizmos />

      <AxisGizmo />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        onStart={() => {
          // Any user camera interaction exits axis-locked view. [web:166][web:178]
          const { axisView, setAxisView } = useEditorStore.getState();
          if (axisView !== "none") {
            setAxisView("none");
          }
        }}
      />
    </>
  );
};
