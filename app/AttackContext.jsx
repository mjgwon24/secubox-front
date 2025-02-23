"use client";

import {createContext, useContext, useState} from "react";

const AttackContext = createContext();

export function AttackProvider({children}) {
    const [isAttacking, setIsAttacking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const startAttack = () => {
        setIsAttacking(true);
        setIsPaused(false);
    }

    const pauseAttack = () => {
        setIsPaused(true);
    }

    const stopAttack = () => {
        setIsAttacking(false);
        setIsPaused(false);
    }

    return (
        <AttackContext.Provider value={{ isAttacking, isPaused, startAttack, pauseAttack, stopAttack }}>
            {children}
        </AttackContext.Provider>
    );
}

export function useAttack() {
    return useContext(AttackContext);
}