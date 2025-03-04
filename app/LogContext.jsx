"use client";

import { createContext, useContext, useState } from "react";

const LogContext = createContext();

export default function LogProvider({ children }) {
  const [logs, setLogs] = useState([]);
  // 시나리오 로그를 담을 배열
  const ddosScenarioLogs = [
    "FIREWALL - INFO  - Inbound traffic from IP 104.28.17.55 exceeded 1000 packets/sec threshold (SYN packets).",
    "SERVER   - WARN  - High number of SYN requests on port 443, backlog queue at 70% capacity.",
    "FIREWALL - WARN  - Combined inbound DDoS traffic approaching 500k pps.",
    "SERVER   - CRIT  - TCP connections backlog 90% full. Possible service impact.",
    "FIREWALL - ALERT - Traffic anomaly threshold reached. SYN flood signatures matched.",
    "FIREWALL - INFO  - Rate Limiting on IP range 104.28.17.0/24, 45.13.210.0/24 ...",
    "FIREWALL - INFO  - Rate Limiting applied on IP 104.28.17.55 (200k -> 50k).",
    "SERVER   - INFO  - Partial recovery: backlog 40%, CPU usage 60%.",
    "FIREWALL - INFO  - Updated ACL: blocking new SYN from 45.13.210.0/24.",
    "FIREWALL - INFO  - Inbound pps stabilized below 30k, no anomalies.",
    "SERVER   - INFO  - Service normal; request queue < 100, CPU 35%.",
    "SECUBOX  - INFO  - DDoS concluded. Continuing monitoring...",
    "SECUBOX  - INFO  - Final attack report generated (ID: 2025-03-15_DDOS_001).",
  ];

  // **📌 로그 추가 함수 (전역 사용 가능)**
  const addLog = (message) => {
    const logMessage = `[${new Date().toLocaleTimeString()}] ${message}`;
    console.log(logMessage);
    setLogs((prevLogs) => [...prevLogs, logMessage]);
  };
  const startDefense = () => {
    // 원하는 로그가 들어 있는 배열 (예: ddosScenarioLogs)
    // const ddosScenarioLogs = [...];

    ddosScenarioLogs.forEach((message, idx) => {
      // idx에 따라 늦게 실행되도록 함 (예: 2초 간격)
      setTimeout(() => {
        // logs에 하나씩 추가
        setLogs((prevLogs) => [...prevLogs, message]);
      }, idx * 2000);
    });
  };

  return (
    <LogContext.Provider value={{ logs, setLogs, addLog, startDefense }}>
      {children}
    </LogContext.Provider>
  );
}

// **📌 전역적으로 사용 가능한 Hook**
export const useLog = () => useContext(LogContext);
