"use client";

import { createContext, useContext, useState } from "react";

const LogContext = createContext();

export default function LogProvider({ children }) {
  const [logs, setLogs] = useState([]);

  // **📌 로그 추가 함수 (전역 사용 가능)**
  const addLog = (message) => {
    const logMessage = `[${new Date().toLocaleTimeString()}] ${message}`;
    console.log(logMessage);
    setLogs((prevLogs) => [...prevLogs, logMessage]);
  };

  return (
    <LogContext.Provider value={{ logs, setLogs, addLog }}>
      {children}
    </LogContext.Provider>
  );
}

// **📌 전역적으로 사용 가능한 Hook**
export const useLog = () => useContext(LogContext);
