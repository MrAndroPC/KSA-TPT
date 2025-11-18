// src/components/ThrusterListPanel.tsx
import React from "react";
import { useThrustersStore } from "../state/thrustersStore";

export const ThrusterListPanel: React.FC = () => {
  const thrusters = useThrustersStore((s) => s.thrusters);
  const selectedId = useThrustersStore((s) => s.selectedId);
  const setSelected = useThrustersStore((s) => s.setSelected);
  const addThruster = useThrustersStore((s) => s.addThruster);
  const duplicateThruster = useThrustersStore((s) => s.duplicateThruster);
  const removeThruster = useThrustersStore((s) => s.removeThruster);

  return (
    <div className="panel">
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <button className="primary" onClick={addThruster}>+ Add</button>
        {selectedId && (
          <button onClick={() => duplicateThruster(selectedId)}>Duplicate</button>
        )}
      </div>
      <ul className="thruster-list">
        {thrusters.map((t) => (
          <li
            key={t.id}
            className={`thruster-list-item ${t.id === selectedId ? "selected" : ""}`}
          >
            <span className="thruster-list-item-label" onClick={() => setSelected(t.id)}>
              {t.id}
            </span>
            <button
              className="danger"
              onClick={() => removeThruster(t.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
