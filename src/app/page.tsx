"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import FileSelector from "@/components/FileSelector";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <>
      <nav className="pt-3 px-3">
        <Navbar />
      </nav>

      <main className="flex justify-center items-center p-5 max-[415px]:p-0.5 w-full min-h-[calc(100vh-75px)] bg-stone-950">
        <FileSelector
          setFiles={setFiles}
          className="min-h-full border p-5 max-[415px]:p-0.5 rounded-xl sm:w-xl md:w-2xl lg:w-3xl xl:w-4xl"
        />
      </main>
    </>
  );
}
