import React, { useState } from "react";

interface AttachmentUploaderProps {
    onFilesChange: (files: File[]) => void;
}

const AttachmentUploader = ({ onFilesChange }: AttachmentUploaderProps) => {
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files);
            const updatedFiles = [...files, ...selectedFiles];
            setFiles(updatedFiles);
            onFilesChange(updatedFiles);
        }
    };

    const handleRemoveFile = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        onFilesChange(updatedFiles);
    };

    return (
        <div className="AttachmentUploader">
            <label>Attachment</label>
            <div
                className="UploaderBox"
                onClick={() => document.getElementById("fileInput")?.click()}
            >
                <p>Drop your files here or <span>Update</span></p>
            </div>
            <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
                multiple
            />
            {files.length > 0 && (
                <ul className="FileList">
                    {files.map((file, index) => (
                        <li key={index}>
                            {file.name}
                            <button onClick={() => handleRemoveFile(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AttachmentUploader;
