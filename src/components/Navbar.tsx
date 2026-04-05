import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconBrandGithub } from "@tabler/icons-react";
import Playlist from "./Playlist";

export default function Navbar({
  isFileSelector,
  filesList,
  setFilesList,
  setCurrentFile,
}: {
  isFileSelector: boolean;
  filesList: File[];
  setFilesList: (files: File[]) => void;
  setCurrentFile: (file: File) => void;
}) {
  return (
    <div className="flex justify-between items-center w-full px-5 py-2 rounded-full bg-stone-900 text-gray-100">
      <div className="flex justify-center items-center gap-1">
        <Image
          src="/logo.png"
          alt="LMplayer"
          height={500}
          width={500}
          className="size-7 select-none"
        />
        <p className="text-lg cursor-default">LMplayer</p>
      </div>

      <div className="flex justify-center items-center gap-2">
        {!isFileSelector && (
          <Playlist
            filesList={filesList}
            setFilesList={setFilesList}
            setCurrentFile={setCurrentFile}
          />
        )}

        <Link
          href="https://github.com/itskdhere/LMplayer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-full hover:cursor-pointer"
          >
            <IconBrandGithub className="size-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
