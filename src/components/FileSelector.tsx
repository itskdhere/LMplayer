"use client";

import { useEffect } from "react";
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import {
  IconExclamationCircle,
  IconFilePlus,
  IconFile,
  IconVideo,
  IconMusic,
  IconPhoto,
  IconTrash,
  IconArrowRight,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
  const fileType = file.file instanceof File ? file.file.type : file.file.type;
  // const fileName = file.file instanceof File ? file.file.name : file.file.name;

  if (fileType.includes("video/")) {
    return <IconVideo className="size-5 opacity-70 text-emerald-500" />;
  } else if (fileType.includes("audio/")) {
    return <IconMusic className="size-5 opacity-70 text-rose-500" />;
  } else if (fileType.startsWith("image/")) {
    return <IconPhoto className="size-5 opacity-70 text-blue-500" />;
  }
  return <IconFile className="size-5 opacity-60" />;
};

export default function FileSelector({
  className,
  filesList,
  setIsFileSelector,
}: {
  className?: string;
  filesList: {
    current: File[];
  };
  setIsFileSelector: (value: boolean) => void;
}) {
  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    multiple: false,
    accept: "image/*,video/*,audio/*",
  });

  useEffect(() => {
    filesList.current = files.map((f) =>
      f.file instanceof File ? f.file : new File([], f.file.name)
    );
  }, [files, filesList]);

  const handleContinue = () => {
    setIsFileSelector(false);
  };

  return (
    <section
      className={cn("flex flex-col gap-2 p-5 border rounded-xl", className)}
    >
      {/* Drop area */}
      <div
        role="button"
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-input p-4 transition-colors hover:cursor-cell hover:bg-accent/50 has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Add files"
        />

        <div className="flex flex-col items-center justify-center text-center">
          <div
            className="mb-2 flex size-12 shrink-0 items-center justify-center rounded-full border bg-background"
            aria-hidden="true"
          >
            <IconFilePlus className="size-6 opacity-60" />
          </div>
          <p className="mb-1.5 text-lg font-medium">Add Files</p>
          <p className="mb-2 text-muted-foreground">
            Drag & Drop / Click to browse files
          </p>
          <div className="flex flex-wrap justify-center gap-1 text-sm text-muted-foreground/70">
            <span>Video</span>
            <span>•</span>
            <span>Photo</span>
            <span>•</span>
            <span>Audio</span>
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-xs text-destructive"
          role="alert"
        >
          <IconExclamationCircle className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
                  {getFileIcon(file)}
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="truncate text-sm font-medium">
                    {file.file instanceof File
                      ? file.file.name
                      : file.file.name}
                  </p>
                  <div className="flex flex-wrap justify-start gap-1 text-xs text-muted-foreground">
                    <span>
                      {formatBytes(
                        file.file instanceof File
                          ? file.file.size
                          : file.file.size
                      )}
                    </span>
                    <span> • </span>
                    <span>
                      {file.file instanceof File
                        ? new Date(file.file.lastModified).toDateString()
                        : "Unknown Date"}
                    </span>
                    <span> • </span>
                    <span>
                      {file.file instanceof File
                        ? new Date(file.file.lastModified).toTimeString()
                        : "Unknown Time"}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="-me-2 size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground hover:cursor-pointer"
                onClick={() => removeFile(file.id)}
                aria-label="Remove file"
              >
                <IconTrash className="size-4 text-red-400" aria-hidden="true" />
              </Button>
            </div>
          ))}

          {/* Action buttons */}
          {files.length > 0 && (
            <div className="flex justify-between items-center mt-5">
              <Button
                size="sm"
                variant="secondary"
                className="leading-tight hover:cursor-pointer"
                onClick={clearFiles}
              >
                <IconTrash className="size-4" aria-hidden="true" />
                <span>Remove All</span>
              </Button>

              <Button
                size="sm"
                variant="default"
                className="leading-tight hover:cursor-pointer"
                onClick={handleContinue}
              >
                <span>Continue</span>
                <IconArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
