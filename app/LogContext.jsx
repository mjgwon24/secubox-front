"use client";

import { createContext, useContext, useState } from "react";

const LogContext = createContext();

export default function LogProvider({ children }) {
  const [logs, setLogs] = useState([]);
  const [color, setColor] = useState("white");
  // 시나리오 로그를 담을 배열
  const ddosScenarioLogs = [
    "[오후 4:59:16] [INFO] Inbound traffic from IP 104.28.17.55 exceeded 1000 packets/sec threshold (SYN packets).",
    "[오후 4:59:16] [WARN] High number of SYN requests on port 443, backlog queue at 70% capacity.",
    "[오후 4:59:16] [WARN] Combined inbound DDoS traffic approaching 500k pps.",
    "[오후 4:59:16] [CRIT] TCP connections backlog 90% full. Possible service impact.",
    "[오후 4:59:16] [ALERT] Traffic anomaly threshold reached. SYN flood signatures matched.",
    "[오후 4:59:16] [INFO] Rate Limiting on IP range 104.28.17.0/24, 45.13.210.0/24 ...",
    "[오후 4:59:16] [INFO] Rate Limiting applied on IP 104.28.17.55 (200k -> 50k).",
    "[오후 4:59:16] [INFO] Partial recovery: backlog 40%, CPU usage 60%.",
    "[오후 4:59:16] [INFO] Updated ACL: blocking new SYN from 45.13.210.0/24.",
    "[오후 4:59:16] [INFO] Inbound pps stabilized below 30k, no anomalies.",
    "[오후 4:59:16] [INFO] Service normal; request queue < 100, CPU 35%.",
    "[오후 4:59:16] [INFO] DDoS concluded. Continuing monitoring...",
    "[오후 4:59:16] [INFO] Final attack report generated (ID: 2025-03-15_DDOS_001).",
  ];
  // 로그 레벨별 색상 지정 (예시)
  function getColor(log) {
    if (log.includes("[CRIT]") || log.includes("[ALERT]")) {
      return "#F2C200";
    } else if (log.includes("[WARN]")) {
      return "#F14C4C";
    } else if (log.includes("[INFO]")) {
      return "#6897BB";
    }
    return "text-gray-500";
  }

  // 현재 시각(오전/오후, 12시간 형식)을 “[오전/오후 시:분:초]” 형태로 반환하는 함수
  function getKoreanTimeStamp() {
    const now = new Date();
    let hour24 = now.getHours();
    const ampm = hour24 < 12 ? "오전" : "오후";
    // 12시간 형식으로 변환 (0시는 12로 표현)
    let hour12 = hour24 % 12 || 12;

    // 분과 초 앞자리 0 채우기
    const minute = String(now.getMinutes()).padStart(2, "0");
    const second = String(now.getSeconds()).padStart(2, "0");

    return `[${ampm} ${hour12}:${minute}:${second}]`;
  }

  // 기존 로그의 “[오후 4:59:16]” 패턴을 실제 현재 시간으로 교체
  const updatedLogs = ddosScenarioLogs.map((log) => {
    // 정규식: 맨 앞 대괄호부터 시작, '오후 ' 다음 숫자~형식, 닫는 대괄호까지
    return log.replace(/\[오후 \d{1,2}:\d{2}:\d{2}\]/, getKoreanTimeStamp());
  });

  // **📌 로그 추가 함수 (전역 사용 가능)**
  const addLog = (message) => {
    const logMessage = `[${new Date().toLocaleTimeString()}] ${message}`;
    console.log(logMessage);
    setLogs((prevLogs) => [...prevLogs, logMessage]);
  };
  const startDefense = () => {
    // 원하는 로그가 들어 있는 배열 (예: ddosScenarioLogs)
    // const ddosScenarioLogs = [...];

    updatedLogs.forEach((message, idx) => {
      // idx에 따라 늦게 실행되도록 함 (예: 2초 간격)
      setTimeout(() => {
        // logs에 하나씩 추가
        setLogs((prevLogs) => [...prevLogs, message]);
      }, idx * 2000);
    });
  };

  return (
    <LogContext.Provider
      value={{ logs, setLogs, addLog, startDefense, getColor }}
    >
      {children}
    </LogContext.Provider>
  );
}

// **📌 전역적으로 사용 가능한 Hook**
export const useLog = () => useContext(LogContext);
