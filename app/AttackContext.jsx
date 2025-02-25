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
  const [clickedAttackId, setClickedAttackId] = useState(null);

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
      }}
    >
      {children}
    </AttackContext.Provider>
  );
}

export function useAttack() {
  return useContext(AttackContext);
}
