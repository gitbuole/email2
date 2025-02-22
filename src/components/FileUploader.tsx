'use client';

interface FileUploaderProps {
  label: string;
  onFileUpload: (file: File) => void;
  accept: string;
}

export default function FileUploader({ label, onFileUpload, accept }: FileUploaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="p-6 border-2 border-dashed rounded-lg">
      <label className="block text-lg font-medium mb-4">{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
  );
} 