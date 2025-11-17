// src/components/LoadedModel.tsx
import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Sphere } from "three";
import { useModelStore } from "../state/modelStore";

interface Props {
  url: string;
}

export const LoadedModel: React.FC<Props> = ({ url }) => {
  const setRootScene = useModelStore((s) => s.setRootScene);
  const setMeanRadius = useModelStore((s) => s.setMeanRadius);
  const { scene } = useGLTF(url);

  useEffect(() => {
    if (!scene) return;

    setRootScene(scene);

    // Compute bounding sphere radius of the whole part [web:146][web:2]
    const box = new Box3().setFromObject(scene);
    const sphere = box.getBoundingSphere(new Sphere());
    const radius = sphere.radius;

    setMeanRadius(Number.isFinite(radius) ? radius : null);
  }, [scene, setRootScene, setMeanRadius]);

  return <primitive object={scene} />;
};
