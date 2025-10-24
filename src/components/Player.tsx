import { cn } from "@/lib/utils";
import {
  MediaPlayer,
  MediaProvider,
  type VideoMimeType,
} from "@vidstack/react";
import {
  DefaultVideoLayout,
  DefaultAudioLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";

export default function Player({
  className,
  file,
}: {
  className?: string;
  file: File;
}) {
  return (
    <div
      className={cn("flex justify-center items-center max-w-6xl", className)}
    >
      <MediaPlayer
        title={file.name}
        src={{
          src: URL.createObjectURL(file),
          type: file.type as VideoMimeType,
        }}
      >
        <MediaProvider />
        <DefaultAudioLayout icons={defaultLayoutIcons} />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </div>
  );
}
