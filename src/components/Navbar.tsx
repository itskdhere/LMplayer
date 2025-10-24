import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconFilePlus, IconBrandGithub } from "@tabler/icons-react";

export default function Navbar({
  isFileSelector,
  setIsFileSelector,
}: {
  isFileSelector: boolean;
  setIsFileSelector: (value: boolean) => void;
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
          <Button
            variant="default"
            size="sm"
            className="rounded-full hover:cursor-pointer"
            onClick={() => setIsFileSelector(!isFileSelector)}
          >
            <IconFilePlus className="size-4" />
            <span className="leading-tight">New File</span>
          </Button>
        )}

        <Link
          href="https://github.com/itskdhere"
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
