"use client";

import { Play, Pause, Square } from "lucide-react";
import { useState } from "react";
import { FileAddIcon } from "../icons/FileAddIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { FileSaveIcon } from "../icons/FileSaveIcon";
import { useAttack } from "@/app/AttackContext";

export const Header = () => {
  const {isAttacking, isPaused, startAttack, pauseAttack, stopAttack} = useAttack();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!isPlaying) {
        onStartAttack();
    } else {
        onStopAttack();
    }

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


          {/*{!isAttacking ? (*/}
          {/*    <button className="p-2 hover:bg-gray-700 rounded transition-colors" */}
          {/*            onClick={startAttack}*/}
          {/*            aria-label={isPlaying ? "Pause" : "Play"}>*/}
          {/*      {isPlaying ? <Pause size={20} /> : <Play size={20} />}*/}
          {/*    </button>*/}
          {/*) : (*/}
          {/*    <>*/}
          {/*      {isPaused ? (*/}
          {/*          <button className="bg-yellow-500 px-4 py-2 rounded" onClick={startAttack}>*/}
          {/*            재개*/}
          {/*          </button>*/}
          {/*      ) : (*/}
          {/*          <button className="bg-yellow-500 px-4 py-2 rounded" onClick={pauseAttack}>*/}
          {/*            일시정지*/}
          {/*          </button>*/}
          {/*      )}*/}
          {/*      <button className="bg-gray-500 px-4 py-2 rounded" onClick={stopAttack}>*/}
          {/*        중지*/}
          {/*      </button>*/}
          {/*    </>*/}
          {/*)}*/}

          {!isAttacking ? (
              <button className="p-2 hover:bg-gray-700 rounded transition-colors"
                      onClick={startAttack}
                      aria-label={isPlaying ? "Pause" : "Play"}>
                 <Play size={20} />
              </button>
          ) : (
              <>
                {isPaused ? (
                    <button className="p-2 hover:bg-gray-700 rounded transition-colors"
                            onClick={startAttack}
                            aria-label={isPlaying ? "Pause" : "Play"}>
                      <Play size={20}/>
                    </button>
                ) : (
                    <button className="p-2 hover:bg-gray-700 rounded transition-colors"
                            onClick={pauseAttack}
                            aria-label={isPlaying ? "Pause" : "Play"}>
                      <Pause size={20}/>
                    </button>
                )}
                <button
                    onClick={stopAttack}
                    className="p-2 hover:bg-gray-700 rounded transition-colors"
                    aria-label="Stop"
                >
                  <Square size={20}/>
                </button>
              </>
          )}

          {/*<button*/}
          {/*    onClick={handlePlayPause}*/}
          {/*    className="p-2 hover:bg-gray-700 rounded transition-colors"*/}
          {/*    aria-label={isPlaying ? "Pause" : "Play"}*/}
          {/*>*/}
          {/*  {isPlaying ? <Pause size={20} /> : <Play size={20} />}*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  onClick={handleStop}*/}
          {/*  className="p-2 hover:bg-gray-700 rounded transition-colors"*/}
          {/*  aria-label="Stop"*/}
          {/*>*/}
          {/*  <Square size={20} />*/}
          {/*</button>*/}



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
