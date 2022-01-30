import type { DragEvent } from "react";
import { FileDrop } from "react-file-drop";

interface FileDropZoneProps {
    onFileDrop: (data: string) => void;
}

export const FileDropZone: preact.FunctionalComponent<FileDropZoneProps> = ({ onFileDrop }) => {
    const onDrop = (files: FileList, event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        if (files.length > 0) {
            files[0].text().then(onFileDrop).catch((err) => console.error("Failed loading file", err));
        }
    };

    return <div style={{
        width: "512px",
        height: "512px",
    }}>
        <FileDrop onDrop={onDrop}>
            Drag accounts.json here
        </FileDrop>
    </div>;
};
