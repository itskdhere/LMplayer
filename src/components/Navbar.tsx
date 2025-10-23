import Link from "next/link";
import Image from "next/image";
import { IconBrandGithub } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav>
      <div className="flex justify-between items-center w-full px-4 py-2 bg-stone-800 text-white">
        <div className="flex justify-center items-center gap-1">
          <Image
            src="/logo.png"
            alt="LMplayer"
            height={500}
            width={500}
            className="size-7 select-none"
          />
          <p className="text-lg font-semibold">LMplayer</p>
        </div>

        <div className="flex justify-center items-center gap-1">
          <Link
            href="https://github.com/itskdhere"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="sm" className="rounded-full">
              <IconBrandGithub size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
