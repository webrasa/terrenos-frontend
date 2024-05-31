import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileWithPreview extends File {
  preview: string;
}

const ImageUploader: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length <= 5) {
        const newFiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        setFiles([...files, ...newFiles]);
      } else {
        alert('You can only upload up to 5 files.');
      }
    },
    [files]
  );

  const removeFile = (file: FileWithPreview) => {
    setFiles(files.filter((f) => f !== file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`p-6 border-4 font-semibold cursor-pointer border-dashed rounded-md ${isDragActive ? 'border-blue-500' : 'border-gray-300'} w-full`}
      >
        <input {...getInputProps()} />
        {files.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500">Drag or Drop files here</p>
            <p className="text-gray-500">or</p>
            <p className="text-blue-600">Browse files</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {files.map((file, index) => (
              <ImagePreview
                key={index}
                file={file}
                onRemove={() => removeFile(file)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-between text-xs">
        <div className="font-bold">Maximum of 5 images</div>
        <div className="font-medium text-gray-500">
          Accepted file types: jpeg, png, jpg
        </div>
      </div>
    </div>
  );
};

interface ImagePreviewProps {
  file: FileWithPreview;
  onRemove: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file, onRemove }) => {
  return (
    <div className="relative w-full h-32 overflow-hidden rounded-md border">
      <img
        src={file.preview}
        alt={file.name}
        className="w-full h-full object-cover"
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute top-1 right-1 bg-black text-white rounded-full p-1 flex items-center justify-center"
        style={{ width: '24px', height: '24px' }}
      >
        X
      </button>
    </div>
  );
};

export default ImageUploader;
