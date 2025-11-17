// src/components/ThrusterListPanel.tsx
import React from "react";
import { useThrustersStore } from "../state/thrustersStore";

export const ThrusterListPanel: React.FC = () => {
  const thrusters = useThrustersStore((s) => s.thrusters);
  const selectedId = useThrustersStore((s) => s.selectedId);
  const setSelected = useThrustersStore((s) => s.setSelected);
  const addThruster = useThrustersStore((s) => s.addThruster);
  const removeThruster = useThrustersStore((s) => s.removeThruster);

  return (
    <div style={{ width: "260px", padding: "0.5rem", borderLeft: "1px solid #333" }}>
      <button onClick={addThruster}>+ Add thruster</button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {thrusters.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              padding: "0.25rem",
              background: t.id === selectedId ? "#333" : "transparent",
            }}
          >
            <span onClick={() => setSelected(t.id)}>{t.id}</span>
            <button
              onClick={() => removeThruster(t.id)}
              style={{ marginLeft: "0.25rem" }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
