import React, { useMemo } from "react";
import { useThrustersStore } from "../state/thrustersStore";
import { thrustersToXml } from "../lib/xmlSerializer";

export const ExportXmlPanel: React.FC = () => {
  const thrusters = useThrustersStore((s) => s.thrusters);
  const xml = useMemo(() => thrustersToXml(thrusters), [thrusters]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(xml);
      alert("XML copied to clipboard");
    } catch {
      alert("Failed to copy");
    }
  };

  return (
    <div style={{ marginTop: "0.5rem" }}>
      <button onClick={copy}>Copy XML</button>
      <textarea
        readOnly
        style={{ width: "100%", height: "200px", marginTop: "0.5rem" }}
        value={xml}
      />
    </div>
  );
};
