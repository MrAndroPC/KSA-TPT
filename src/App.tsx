import React from "react";
import { ImportDropZone } from "./components/ImportDropZone";
import { ViewportCanvas } from "./components/ViewportCanvas";
import { ThrusterListPanel } from "./components/ThrusterListPanel";
import { ThrusterPropertiesForm } from "./components/ThrusterPropertiesForm";
import { ExportXmlPanel } from "./components/ExportXmlPanel";
import { TransformModeToolbar } from "./components/TransformModeToolbar";
import { ModelInfoPanel } from "./components/ModelInfoPanel";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="sidebar">
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
