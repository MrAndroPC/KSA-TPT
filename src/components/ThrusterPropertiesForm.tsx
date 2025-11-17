// src/components/ThrusterPropertiesForm.tsx
import React from "react";
import { useThrustersStore } from "../state/thrustersStore";

export const ThrusterPropertiesForm: React.FC = () => {
  const thrusters = useThrustersStore((s) => s.thrusters);
  const selectedId = useThrustersStore((s) => s.selectedId);
  const updateThruster = useThrustersStore((s) => s.updateThruster);
  const resetThrusterRotation = useThrustersStore((s) => s.resetThrusterRotation);

  const thruster = thrusters.find((t) => t.id === selectedId);
  if (!thruster) return <div>No thruster selected</div>;

  const updateScalarField =
    (field: "thrustN" | "specificImpulseSeconds" | "minimumPulseTimeSeconds") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      updateThruster(thruster.id, { [field]: isNaN(v) ? 0 : v } as any);
    };

  const updateStringField =
    (field: "id" | "controlMapCsv" | "volumetricExhaustId" | "soundAction" | "soundId") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      updateThruster(thruster.id, { [field]: e.target.value } as any);
    };

  const updateLocation =
    (axis: "x" | "y" | "z") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      updateThruster(thruster.id, {
        location: { ...thruster.location, [axis]: isNaN(v) ? 0 : v },
      });
    };

  // Optional: direct exhaustDirection editing if you want text control too
  const updateDirection =
    (axis: "x" | "y" | "z") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      updateThruster(thruster.id, {
        exhaustDirection: { ...thruster.exhaustDirection, [axis]: isNaN(v) ? 0 : v },
      });
    };

  return (
    <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
      <div>
        Id:{" "}
        <input value={thruster.id} onChange={updateStringField("id")} />
      </div>
      <div>
        Control CSV:{" "}
        <input
          value={thruster.controlMapCsv}
          onChange={updateStringField("controlMapCsv")}
        />
      </div>

      {/* Position (manual XYZ) */}
      <div style={{ marginTop: "0.5rem" }}>
        Position:
        <div>
            <div>
          X:{" "}
          <input
            type="number"
            step="0.001"
            value={thruster.location.x}
            onChange={updateLocation("x")}
          />
          </div>
          <div>
          Y:{" "}
          <input
            type="number"
            step="0.001"
            value={thruster.location.z}
            onChange={updateLocation("z")}
          />
                    <div>
          Z:{" "}
          <input
            type="number"
            step="0.001"
            value={thruster.location.y}
            onChange={updateLocation("y")}
          />
          </div>
          </div>
        </div>
      </div>

      {/* Direction (optional manual XYZ) */}
      <div style={{ marginTop: "0.5rem" }}>
        Direction:
        <div>
            <div>
          X:{" "}
          <input
            type="number"
            step="0.01"
            value={thruster.exhaustDirection.x}
            onChange={updateDirection("x")}
          />
          </div>
          <div>
          Y:{" "}
          <input
            type="number"
            step="0.01"
            value={thruster.exhaustDirection.z} // Y and Z are swapped
            onChange={updateDirection("z")}
          />
          </div>
          <div>
          Z:{" "}
          <input
            type="number"
            step="0.01"
            value={thruster.exhaustDirection.y} // Y and Z are swapped
            onChange={updateDirection("y")}
          />
          </div>
        </div>
        <button
          style={{ marginTop: "0.25rem" }}
          onClick={() => resetThrusterRotation(thruster.id)}
        >
          Reset rotation (X-)
        </button>
      </div>

      <div style={{ marginTop: "0.5rem" }}>
        Thrust N:{" "}
        <input
          type="number"
          step="0.1"
          value={thruster.thrustN}
          onChange={updateScalarField("thrustN")}
        />
      </div>
      <div>
        Isp (s):{" "}
        <input
          type="number"
          step="1"
          value={thruster.specificImpulseSeconds}
          onChange={updateScalarField("specificImpulseSeconds")}
        />
      </div>
      <div>
        Min pulse (s):{" "}
        <input
          type="number"
          step="0.001"
          value={thruster.minimumPulseTimeSeconds}
          onChange={updateScalarField("minimumPulseTimeSeconds")}
        />
      </div>
      <div>
        VolumetricExhaust Id:{" "}
        <input
          value={thruster.volumetricExhaustId}
          onChange={updateStringField("volumetricExhaustId")}
        />
      </div>
      <div>
        Sound Action:{" "}
        <input
          value={thruster.soundAction}
          onChange={updateStringField("soundAction")}
        />
      </div>
      <div>
        Sound Id:{" "}
        <input
          value={thruster.soundId}
          onChange={updateStringField("soundId")}
        />
      </div>
    </div>
  );
};
