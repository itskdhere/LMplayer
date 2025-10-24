"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import FileSelector from "@/components/FileSelector";

export default function Home() {
  const [isFileSelector, setIsFileSelector] = useState<boolean>(true);
  const filesList = useRef<File[]>([]);

  return (
    <>
      <nav className="pt-3 px-3">
        <Navbar />
      </nav>

      <main className="flex justify-center items-center min-w-full min-h-[calc(100vh-60px)] bg-stone-950">
        {isFileSelector ? (
          <FileSelector
            filesList={filesList}
            setIsFileSelector={setIsFileSelector}
            className="min-h-full sm:w-xl md:w-2xl lg:w-3xl xl:w-4xl"
          />
        ) : (
          <div className="flex justify-center items-center">
            <h1>Player</h1>
          </div>
        )}
      </main>
    </>
  );
}
