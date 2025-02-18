"use client";

import { Play, Pause, Square } from "lucide-react";
import { useState } from "react";
import { FileAddIcon } from "../icons/FileAddIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { FileSaveIcon } from "../icons/FileSaveIcon";

export const Header = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  return (
    <div className="w-full bg-primary text-white">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-lg font-semibold">SecuBox</div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayPause}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={handleStop}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
            aria-label="Stop"
          >
            <Square size={20} />
          </button>
          <div className="w-px h-6 bg-gray-600 mx-2" />
          <button
            className="p-2 hover:bg-gray-700 rounded transition-colors"
            aria-label="Add File"
          >
            <FileAddIcon />
          </button>
          <button
            className="p-2 hover:bg-gray-700 rounded transition-colors"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
          <button
            className="p-2 hover:bg-gray-700 rounded transition-colors"
            aria-label="Save File"
          >
            <FileSaveIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
