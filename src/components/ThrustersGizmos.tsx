import React from "react";
import { useThrustersStore } from "../state/thrustersStore";
import { ThrusterGizmo } from "./ThrusterGizmo";

export const ThrustersGizmos: React.FC = () => {
  const thrusters = useThrustersStore((s) => s.thrusters);

  return (
    <>
      {thrusters.map((t) => (
        <ThrusterGizmo key={t.id} thrusterId={t.id} />
      ))}
    </>
  );
};
