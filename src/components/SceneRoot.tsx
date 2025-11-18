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
  const threeCamera = useThree((state) => state.camera as PerspectiveCamera); // [web:197][attached_file:1]
  const cameraRef = useRef<PerspectiveCamera | null>(threeCamera);
  const controlsRef = useRef<OrbitControlsImpl>(null!);

  const axisView = useEditorStore((s) => s.axisView);
  const meanRadius = useModelStore((s) => s.meanRadius) ?? 1;
  const glbUrl = useModelStore((s) => s.glbUrl);

  const lockedPolarRef = useRef(0);     // [web:2][web:181]
  const lockedAzimuthRef = useRef(0);   // [web:2][web:181]
  const snappingRef = useRef(false);    // ignore onChange while snapping [web:184][web:189]

  useEffect(() => {
    cameraRef.current = threeCamera;
  }, [threeCamera]); // [web:197][attached_file:1]

  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return; // [web:197][attached_file:1]

    const controls = controlsRef.current;
    const target = new Vector3(0, 0, 0);
    const dist = meanRadius * 3; // [web:146][web:150]

    if (axisView === "none") {
      camera.fov = 50;
      camera.updateProjectionMatrix();
      return;
    }

    snappingRef.current = true; // programmatic snap starts [web:184][web:189]

    const pos = new Vector3();
    switch (axisView) {
      case "front":
        pos.set(dist, 0, 0);
        break;
      case "back":
        pos.set(-dist, 0, 0);
        break;
      case "right":
        pos.set(0, dist, 0);
        break;
      case "left":
        pos.set(0, -dist, 0);
        break;
      case "top":
        pos.set(0, 0, dist);
        break;
      case "bottom":
        pos.set(0, 0, -dist);
        break;
    }

    camera.position.copy(pos);
    if (controls) {
      controls.target.copy(target);
      controls.update(); // will fire onChange, but snappingRef prevents exit [web:181][web:184][web:189]

      lockedPolarRef.current = controls.getPolarAngle();       // [web:2][web:181][web:189]
      lockedAzimuthRef.current = controls.getAzimuthalAngle(); // [web:2][web:181][web:189]
    } else {
      camera.lookAt(target);
      lockedPolarRef.current = 0;
      lockedAzimuthRef.current = 0;
    }

    camera.fov = 5; // pseudo-orthographic [web:168][web:179]
    camera.updateProjectionMatrix();

    snappingRef.current = false; // snap finished [web:184][web:189]
  }, [axisView, meanRadius]); // [web:181][web:189][attached_file:1]

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
        onChange={() => {
          const { axisView, setAxisView } = useEditorStore.getState();
          if (axisView === "none") return; // normal mode [web:183][web:192]

          if (snappingRef.current) return; // ignore changes caused by our own snap [web:184][web:189]

          const controls = controlsRef.current;
          if (!controls) return;

          const polar = controls.getPolarAngle();         // [web:2][web:181]
          const azimuth = controls.getAzimuthalAngle();   // [web:2][web:181]

          const eps = 1e-3;

          const rotated =
            Math.abs(polar - lockedPolarRef.current) > eps ||
            Math.abs(azimuth - lockedAzimuthRef.current) > eps;

          if (rotated) {
            setAxisView("none"); // user rotated; leave ortho mode [web:181][web:189]
          }
        }}
      />
    </>
  );
};
