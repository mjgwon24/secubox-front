"use client";

import { useState } from "react";
import { ObjectButton } from "@/app/components/sidebar/ui/leftSidebar/ObjectButton";
import { v4 as uuidv4 } from "uuid";

export const LeftSidebar = () => {
  const [objects] = useState([
    { id: "lan-cable", name: "LAN Cable" },
    { id: "fabric-net", name: "Fabric Net" },
    { id: "pc", name: "PC" },
    { id: "attack-pc", name: "Attack PC" },
    { id: "router", name: "Router" },
    { id: "server", name: "Server" },
    { id: "switch", name: "Switch" },
    { id: "cloud", name: "Cloud" },

    { id: "utm", name: "UTM" },

    { id: "internet", name: "Internet" },
    { id: "firewall", name: "Firewall" },
    { id: "gmail", name: "Gmail" },
    { id: "google-drive", name: "Google Drive" },

  ]);

  return (
    <div className="max-w-[250px] bg-[#1C1C1C] text-white space-y-8 border border-[#3C3C3C] overflow-y-auto custom-scrollbar ">
      <div className="bg-[#26292B] flex items-center justify-between px-4 py-3 border border-[#3C3C3C]">
        <h2 className="text-[#D3D3D3] weight-600">Object</h2>
      </div>

      <div className="px-4">
        <div className="flex flex-row flex-wrap gap-4">
          {objects.map((object) => (
            <ObjectButton
              key={object.id}
              iconKey={object.id}
              name={object.name}
              onDragStart={() => ({
                iconKey: object.id,
                id: uuidv4(),
                name: object.name,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
