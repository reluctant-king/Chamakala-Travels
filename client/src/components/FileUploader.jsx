import React, { useState } from 'react';

/**
 * FileUploader – drag‑and‑drop area with image preview.
 * Props:
 *   onChange: (file: File) => void – called when a file is selected
 *   accept: string – MIME types (default image/*)
 *   multiple: boolean – allow multiple files (not used in current UI)
 */
const FileUploader = ({ onChange, accept = 'image/*', multiple = false }) => {
  const [preview, setPreview] = useState(null);

  const handleFiles = (files) => {
    const file = files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const onSelect = (e) => {
    handleFiles(e.target.files);
  };

  return (
    <div
      className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center cursor-pointer bg-white/5 hover:bg-white/10 transition"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      {preview ? (
        <img src={preview} alt="preview" className="mx-auto max-h-48 object-cover rounded" />
      ) : (
        <p className="text-gray-400">Drag & drop an image or click to select</p>
      )}
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onSelect}
        className="hidden"
      />
    </div>
  );
};

export default FileUploader;
