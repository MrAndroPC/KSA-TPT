import React, { useCallback } from "react";
import { useModelStore } from "../state/modelStore";

export const ImportDropZone: React.FC = () => {
  const setGlbUrl = useModelStore((s) => s.setGlbUrl);

  const onFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const file = files[0];
      if (!file.name.toLowerCase().endsWith(".glb")) return;

      const url = URL.createObjectURL(file);
      setGlbUrl(url);
    },
    [setGlbUrl]
  );

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiles(e.target.files);
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={{
        border: "1px dashed gray",
        padding: "0.5rem",
        marginBottom: "0.5rem",
      }}
    >
      <div>Drop .glb here or choose file:</div>
      <input type="file" accept=".glb" onChange={onInputChange} />
    </div>
  );
};
