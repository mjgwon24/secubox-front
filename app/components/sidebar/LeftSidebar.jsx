"use client";

import { useState } from "react";
import { ObjectButton } from "@/app/components/sidebar/ui/leftSidebar/ObjectButton";

export const LeftSidebar = () => {
  const [objects] = useState([
    { id: "router", name: "router" },
    { id: "switch", name: "switch" },
    { id: "cloud", name: "cloud" },
    { id: "lan-cable", name: "lan cable" },
    { id: "fabric-net", name: "fabric net" },
    { id: "pc", name: "pc" },
    { id: "utm", name: "utm" },
    { id: "server", name: "server" },
    { id: "internet", name: "internet" },
    { id: "firewall", name: "firewall" },
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};
