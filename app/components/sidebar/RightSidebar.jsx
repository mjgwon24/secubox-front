"use client";
import { useState } from "react";
import AttackButton from "./ui/rightSidebar/AttackButton";
import DefenseToggle from "./ui/rightSidebar/DefenseToggle";
import { Sliders } from "lucide-react";

export const RightSidebar = () => {
  const [attacks] = useState([
    { id: "ransomware", name: "Ransomware" },
    { id: "privilege-escalation", name: "Privilege Escalation" },
    { id: "ddos", name: "DDOS" },
    { id: "mitm", name: "MITM" },
  ]);

  const [defenses, setDefenses] = useState([
    { id: "ips-ids", name: "IPS/IDS", enabled: false },
    { id: "mfa", name: "MFA", enabled: false },
    { id: "geo-blocking", name: "Geo-blocking", enabled: false },
  ]);

  const handleDefenseToggle = (id) => {
    setDefenses(
      defenses.map((defense) =>
        defense.id === id ? { ...defense, enabled: !defense.enabled } : defense
      )
    );
  };

  return (
    <div className="max-w-[250px] bg-[#1C1C1C] text-white space-y-8 border border-[#3C3C3C] max-h-screen overflow-y-auto custom-scrollbar">
      {/* Attack Section */}
      <div className="bg-[#26292B] flex items-center justify-between px-4 py-3 border border-[#3C3C3C]">
        <h2 className="weight-600 text-[#D3D3D3] select-none">Attack</h2>
      </div>
      <div className="space-y-4 pl-6 pr-6">
        <div className="space-y-3">
          {attacks.map((attack) => (
            <AttackButton key={attack.id} name={attack.name} />
          ))}
        </div>
      </div>

      {/* Defense Section */}
      <div className="bg-[#26292B] flex items-center justify-between px-4 py-3 border border-[#3C3C3C]">
        <h2 className="weight-600 text-[#D3D3D3] select-none">Defense</h2>
      </div>
      <div className="space-y-4 pl-6 pr-6">
        <div className="space-y-3">
          {defenses.map((defense) => (
            <DefenseToggle
              key={defense.id}
              name={defense.name}
              enabled={defense.enabled}
              onToggle={() => handleDefenseToggle(defense.id)}
            />
          ))}

          {/* Rate Limiting Control */}
          <div className="flex items-center justify-between w-full p-4 bg-[#2A2A2A] rounded-lg">
            <span className="text-[#C5C5C5] text-[14px]">Rate Limiting</span>
            <button
              className="p-1 hover:bg-[#333333] rounded transition-colors mr-2"
              aria-label="Configure rate limiting"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
