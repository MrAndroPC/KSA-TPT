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
    <div className="panel">
      <button className="primary" onClick={copy}>Copy XML</button>
      <textarea
        readOnly
        value={xml}
      />
    </div>
  );
};
