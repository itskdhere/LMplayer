"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  IconPlaylist,
  IconPlus,
  IconFile,
  IconVideo,
  IconMusic,
  IconTrash,
} from "@tabler/icons-react";
import { useFileUpload } from "@/hooks/use-file-upload";

export const getFileIcon = (file: {
  file:
    | File
    | { name: string; size: number; type?: string; lastModified?: number };
}) => {
  const fileType =
    file.file instanceof File ? file.file.type : (file.file.type ?? "");

  if (fileType.includes("video/")) {
    return <IconVideo className="size-5 opacity-70 text-emerald-500" />;
  } else if (fileType.includes("audio/")) {
    return <IconMusic className="size-5 opacity-70 text-rose-500" />;
  }
  return <IconFile className="size-5 opacity-60" />;
};

export default function Playlist({
  filesList,
  setFilesList,
  setCurrentFile,
}: {
  filesList: File[];
  setFilesList: (files: File[]) => void;
  setCurrentFile: (file: File) => void;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [, { openFileDialog, getInputProps }] = useFileUpload({
    multiple: true,
    accept: "video/*,audio/*",
    onFilesAdded: (addedFiles) => {
      const newFiles = addedFiles.map((f) => f.file as File);
      setFilesList([...filesList, ...newFiles]);
    },
  });

  const handleDialogState = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleFileSelection = (file: File) => {
    setCurrentFile(file);
    setIsDialogOpen(false);
  };

  const handleDeleteFile = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const newFiles = filesList.filter((_, i) => i !== index);
    setFilesList(newFiles);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogState}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="rounded-full hover:cursor-pointer"
        >
          <IconPlaylist className="inline size-4 translate-y-[1.25px]" />
          <span className="leading-tight">Playlist</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base hover:cursor-default">
            <IconPlaylist className="inline size-4 mr-2" />
            <span>Playlist</span>
          </DialogTitle>
          <div className="overflow-y-auto">
            <DialogDescription asChild>
              <div className="px-6 py-4">
                <div className="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground">
                  {filesList?.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No files in the playlist.
                    </p>
                  ) : (
                    filesList?.map((file, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center rounded-md border p-3 hover:bg-stone-800 hover:cursor-pointer"
                        onClick={() => handleFileSelection(file)}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
                            {getFileIcon({ file })}
                          </div>
                          <div>
                            <p className="text-sm">
                              <strong>{file.name}</strong>
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB • Last
                              Modified:{" "}
                              {file.lastModified
                                ? new Date(file.lastModified).toLocaleString()
                                : "Unknown"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 hover:bg-red-500/10 hover:text-red-500 hover:cursor-pointer transition-colors"
                            onClick={(e) => handleDeleteFile(e, index)}
                          >
                            <IconTrash className="size-5" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="border-t px-6 py-4 flex flex-row items-center justify-between sm:justify-between w-full">
          <div className="flex-1">
            <input {...getInputProps()} className="sr-only" />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="hover:cursor-pointer gap-1.5"
              onClick={openFileDialog}
            >
              <IconPlus className="size-4" />
              <span>Add More File(s)</span>
            </Button>
          </div>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="hover:cursor-pointer"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
