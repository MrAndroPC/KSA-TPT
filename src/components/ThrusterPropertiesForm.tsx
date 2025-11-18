// src/components/ThrusterPropertiesForm.tsx
import React from "react";
import { useThrustersStore } from "../state/thrustersStore";

export const ThrusterPropertiesForm: React.FC = () => {
  const thrusters = useThrustersStore((s) => s.thrusters);
  const selectedId = useThrustersStore((s) => s.selectedId);
  const updateThruster = useThrustersStore((s) => s.updateThruster);
  const resetThrusterRotation = useThrustersStore((s) => s.resetThrusterRotation);

  const thruster = thrusters.find((t) => t.id === selectedId);
  if (!thruster) return <div className="info-display">No thruster selected</div>;

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
    <div className="panel properties-form">
      <div className="form-group">
        <div className="form-row">
          <label className="form-label">Id:</label>
          <input value={thruster.id} onChange={updateStringField("id")} />
        </div>
      </div>

      <div className="form-group">
        <div className="form-row">
          <label className="form-label">Control CSV:</label>
          <input
            value={thruster.controlMapCsv}
            onChange={updateStringField("controlMapCsv")}
          />
        </div>
      </div>

      <div className="properties-section">
        <div className="properties-section-title">Position</div>
        <div className="input-group">
          <div className="form-row">
            <label className="form-label">X:</label>
            <input
              type="number"
              step="0.001"
              value={thruster.location.x}
              onChange={updateLocation("x")}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Y:</label>
            <input
              type="number"
              step="0.001"
              value={thruster.location.z}
              onChange={updateLocation("z")}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Z:</label>
            <input
              type="number"
              step="0.001"
              value={thruster.location.y}
              onChange={updateLocation("y")}
            />
          </div>
        </div>
      </div>

      <div className="properties-section">
        <div className="properties-section-title">Direction</div>
        <div className="input-group">
          <div className="form-row">
            <label className="form-label">X:</label>
            <input
              type="number"
              step="0.01"
              value={thruster.exhaustDirection.x}
              onChange={updateDirection("x")}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Y:</label>
            <input
              type="number"
              step="0.01"
              value={thruster.exhaustDirection.z}
              onChange={updateDirection("z")}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Z:</label>
            <input
              type="number"
              step="0.01"
              value={thruster.exhaustDirection.y}
              onChange={updateDirection("y")}
            />
          </div>
          <button onClick={() => resetThrusterRotation(thruster.id)}>
            Reset rotation (X-)
          </button>
        </div>
      </div>

      <div className="properties-section">
        <div className="properties-section-title">Performance</div>
        <div className="form-group">
          <div className="form-row">
            <label className="form-label">Thrust N:</label>
            <input
              type="number"
              step="0.1"
              value={thruster.thrustN}
              onChange={updateScalarField("thrustN")}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-row">
            <label className="form-label">Isp (s):</label>
            <input
              type="number"
              step="1"
              value={thruster.specificImpulseSeconds}
              onChange={updateScalarField("specificImpulseSeconds")}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-row">
            <label className="form-label">Min pulse (s):</label>
            <input
              type="number"
              step="0.001"
              value={thruster.minimumPulseTimeSeconds}
              onChange={updateScalarField("minimumPulseTimeSeconds")}
            />
          </div>
        </div>
      </div>

      <div className="properties-section">
        <div className="properties-section-title">Effects & Sound</div>
        <div className="form-group">
          <div className="form-row">
            <label className="form-label">Exhaust Id:</label>
            <input
              value={thruster.volumetricExhaustId}
              onChange={updateStringField("volumetricExhaustId")}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-row">
            <label className="form-label">Sound Action:</label>
            <input
              value={thruster.soundAction}
              onChange={updateStringField("soundAction")}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-row">
            <label className="form-label">Sound Id:</label>
            <input
              value={thruster.soundId}
              onChange={updateStringField("soundId")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
