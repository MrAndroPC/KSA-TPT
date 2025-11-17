import React from "react";
import { ImportDropZone } from "./components/ImportDropZone";
import { ViewportCanvas } from "./components/ViewportCanvas";
import { ThrusterListPanel } from "./components/ThrusterListPanel";
import { ThrusterPropertiesForm } from "./components/ThrusterPropertiesForm";
import { ExportXmlPanel } from "./components/ExportXmlPanel";
import { TransformModeToolbar } from "./components/TransformModeToolbar";
import { ModelInfoPanel } from "./components/ModelInfoPanel";

const App: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "260px", padding: "0.5rem" }}>
        <h3>Thruster Editor</h3>
        <ImportDropZone />
        <ModelInfoPanel />
        <TransformModeToolbar />
        <ThrusterListPanel />
        <ThrusterPropertiesForm />
        <ExportXmlPanel />
      </div>
      <ViewportCanvas />
    </div>
  );
};

export default App;
