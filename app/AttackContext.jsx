"use client";

import { createContext, useContext, useState } from "react";

const AttackContext = createContext();

export function AttackProvider({ children }) {
  const [isAttacking, setIsAttacking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [attacks] = useState([
    { id: "ransomware", name: "Ransomware" },
    { id: "privilege-escalation", name: "Privilege Escalation" },
    { id: "ddos", name: "DDOS" },
    { id: "mitm", name: "MITM" },
  ]);

  const defaultItems = [
    {
      name: "Attack PC",
      iconKey: "attack-pc",
      x: 1022,
      y: 238,
    },
    {
      name: "Attack PC",
      iconKey: "attack-pc",
      x: 1025,
      y: 441,
    },
    { name: "PC", iconKey: "pc", x: 312, y: 473 },
    {
      name: "Internet",
      iconKey: "internet",
      x: 899,
      y: 128,
    },
    { name: "Router", iconKey: "router", x: 774, y: 346 },
    { name: "Server", iconKey: "server", x: 308, y: 234 },
    { name: "Switch", iconKey: "switch", x: 420, y: 348 },
    {
      name: "Firewall",
      iconKey: "firewall",
      x: 613,
      y: 344,
    },
    {
      id: "LAN Cable",
      name: "LAN Cable",
      iconKey: "lan-cable",
      startX: 316,
      startY: 271,
      endX: 412,
      endY: 362,
    }, // PC -> Router
    {
      id: "LAN Cable",
      name: "LAN Cable",
      iconKey: "lan-cable",
      startX: 322,
      startY: 468,
      endX: 411,
      endY: 379,
    }, // Router -> Firewall
    {
      id: "LAN Cable",
      name: "LAN Cable",
      iconKey: "lan-cable",
      startX: 466,
      startY: 372,
      endX: 608,
      endY: 372,
    }, // Firewall -> Switch
    {
      id: "LAN Cable",
      name: "LAN Cable",
      iconKey: "lan-cable",
      startX: 648,
      startY: 372,
      endX: 767,
      endY: 370,
    }, // Switch -> Server
    {
      id: "LAN Cable",
      name: "LAN Cable",
      iconKey: "lan-cable",
      startX: 1039,
      startY: 432,
      endX: 1036,
      endY: 281,
    }, // Switch -> Internet
    {
      id: "LAN Cable",
      name: "LAN Cable",
      iconKey: "lan-cable",
      startX: 813,
      startY: 337,
      endX: 894,
      endY: 153,
    }, // Attack PC -> Router
    {
      id: "LAN Cable",
      name: "LAN Cable",
      iconKey: "lan-cable",
      startX: 816,
      startY: 375,
      endX: 1022,
      endY: 456,
    }, // Attack PC -> Switch

    // {
    //   id: "LAN Cable",
    //   name: "LAN Cable",
    //   iconKey: "lan-cable",
    //   startX: 312,
    //   startY: 473,
    //   endX: 774,
    //   endY: 346,
    // }, // PC -> Router
    // {
    //   id: "LAN Cable",
    //   name: "LAN Cable",
    //   iconKey: "lan-cable",
    //   startX: 774,
    //   startY: 346,
    //   endX: 613,
    //   endY: 344,
    // }, // Router -> Firewall
    // {
    //   id: "LAN Cable",
    //   name: "LAN Cable",
    //   iconKey: "lan-cable",
    //   startX: 613,
    //   startY: 344,
    //   endX: 420,
    //   endY: 348,
    // }, // Firewall -> Switch
    // {
    //   id: "LAN Cable",
    //   name: "LAN Cable",
    //   iconKey: "lan-cable",
    //   startX: 420,
    //   startY: 348,
    //   endX: 308,
    //   endY: 234,
    // }, // Switch -> Server
    // {
    //   id: "LAN Cable",
    //   name: "LAN Cable",
    //   iconKey: "lan-cable",
    //   startX: 420,
    //   startY: 348,
    //   endX: 899,
    //   endY: 128,
    // }, // Switch -> Internet
    // {
    //   id: "LAN Cable",
    //   name: "LAN Cable",
    //   iconKey: "lan-cable",
    //   startX: 1022,
    //   startY: 238,
    //   endX: 774,
    //   endY: 346,
    // }, // Attack PC -> Router
    // {
    //   id: "LAN Cable",
    //   name: "LAN Cable",
    //   iconKey: "lan-cable",
    //   startX: 1025,
    //   startY: 441,
    //   endX: 420,
    //   endY: 348,
    // }, // Attack PC -> Switch
    {
      id: "Fabric Net",
      name: "Fabric Net",
      iconKey: "fabric-net",
      x: 168,
      y: 168,
      width: 542,
      height: 431,
    },
  ];

  const [clickedAttackId, setClickedAttackId] = useState(null);
  const [isArranged, setIsArranged] = useState(false);

  const startAttack = () => {
    setIsAttacking(true);
    setIsPaused(false);
  };

  const pauseAttack = () => {
    setIsPaused(true);
  };

  const stopAttack = () => {
    setIsAttacking(false);
    setIsPaused(false);
  };

  return (
    <AttackContext.Provider
      value={{
        isAttacking,
        isPaused,
        startAttack,
        pauseAttack,
        stopAttack,
        attacks,
        clickedAttackId,
        setClickedAttackId,
        defaultItems,
        isArranged,
        setIsArranged,
        defaultItems,
      }}
    >
      {children}
    </AttackContext.Provider>
  );
}

export function useAttack() {
  return useContext(AttackContext);
}
