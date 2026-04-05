"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FileSelector from "@/components/FileSelector";
import Player from "@/components/Player";

export default function Home() {
  const [isFileSelector, setIsFileSelector] = useState<boolean>(true);
  const [filesList, setFilesList] = useState<File[]>([]);
  const [currentFile, setCurrentFile] = useState<File | undefined>(
    filesList[0]
  );

  useEffect(() => {
    if (filesList.length === 0) {
      setCurrentFile(undefined);
      setIsFileSelector(true);
    } else if (!currentFile) {
      setCurrentFile(filesList[0]);
    }
  }, [filesList, currentFile]);

  useEffect(() => {
    return () => {
      filesList.forEach((file) => {
        URL.revokeObjectURL(URL.createObjectURL(file));
      });
    };
  }, [filesList]);

  return (
    <>
      <nav className="pt-3 px-3">
        <Navbar
          isFileSelector={isFileSelector}
          filesList={filesList}
          setFilesList={setFilesList}
          setCurrentFile={setCurrentFile}
        />
      </nav>

      <main className="flex justify-center items-center min-w-full min-h-[calc(100vh-60px)] bg-stone-950">
        {isFileSelector ? (
          <FileSelector
            setFilesList={setFilesList}
            setIsFileSelector={setIsFileSelector}
            className="min-h-full sm:w-xl md:w-2xl lg:w-3xl xl:w-4xl"
          />
        ) : (
          <section className="flex justify-center items-center">
            {currentFile && <Player file={currentFile} className="p-5" />}
          </section>
        )}
      </main>
    </>
  );
}
