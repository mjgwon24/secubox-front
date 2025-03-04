"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAttack } from "@/app/AttackContext";
import { useLog } from "../LogContext";
export default function DraggableCable({
  id,
  initialX,
  initialY,
  onDoubleClick,
  droppedItems,
  startX,
  startY,
  endX,
  endY,
}) {
  const [start, setStart] = useState({
    x: startX ?? initialX ?? 0,
    y: startY ?? initialY ?? 0,
  });
  const [end, setEnd] = useState({
    x: endX ?? initialX + 100 ?? 100,
    y: endY ?? initialY + 100 ?? 100,
  });
  const [startObject, setStartObject] = useState(null);
  const [endObject, setEndObject] = useState(null);
  const [activeCables, setActiveCables] = useState([]);

  const [isStartConnected, setIsStartConnected] = useState(false);
  const [isEndConnected, setIsEndConnected] = useState(false);
  const { isAttacking, isPaused, isArranged, lastEndObject, setLastEndObject } =
    useAttack();
  const { addLog } = useLog();

  const DDOS_ATTACK_FLOW = [
    "Attack PC",
    "Router",
    "Firewall",
    "Switch",
    "Server",
    "PC",
  ];
  const DISTANCE_THRESHOLD = 30;
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  // 타이머, 진행 상태 관리 ref
  const intervalRef = useRef(null);
  const cablesInPathRef = useRef([]);
  const currentIndexRef = useRef(0);

  // (Attack 옵션) DDOS Object 배치 후 케이블 연결 초기화
  useEffect(() => {
    if (isArranged) {
      addLog(
        `[DEBUG] 0. DDOS 장비 배치 완료. startX: ${startX}, startY: ${startY}, endX: ${endX}, endY: ${endY}`
      );

      console.log(
        `[DEBUG] 0. isArranged: ${isArranged}, startX: ${startX}, startY: ${startY}, endX: ${endX}, endY: ${endY}`
      );
      if (startX != null && startY != null) setStart({ x: startX, y: startY });
      if (endX != null && endY != null) setEnd({ x: endX, y: endY });
    }
  }, [isArranged, startX, startY, endX, endY]);

  // 1. 배치 케이블의 start, end 좌표 기반으로 연결된 Object 찾기
  useEffect(() => {
    // start, end 좌표 유효성 체크
    if (isNaN(start.x) || isNaN(start.y) || isNaN(end.x) || isNaN(end.y)) {
      console.warn(
        "[DEBUG] 1. Skipping findConnectedObject due to invalid coordinates."
      );
      addLog(
        "[DEBUG] 1. Skipping findConnectedObject due to invalid coordinates."
      );

      return;
    }

    // 주어진 좌표에 가장 가까운 Object 탐색 - Fabric Net, LAN Cable 제외
    const findConnectedObject = (x, y) => {
      const found = droppedItems.find(
        (item) =>
          item.name !== "Fabric Net" &&
          item.name !== "LAN Cable" &&
          Math.abs(item.x + 20 - x) < DISTANCE_THRESHOLD &&
          Math.abs(item.y + 20 - y) < DISTANCE_THRESHOLD
      );
      console.log(`[DEBUG] 1. Found at (${x}, ${y}): ${found?.name}`);
      addLog(`[DEBUG] 1. Found at (${x}, ${y}): ${found?.name}`);
      return found?.name;
    };

    setStartObject(findConnectedObject(start.x, start.y));
    setEndObject(findConnectedObject(end.x, end.y));
  }, [start, end, droppedItems]);

  // 2. 공격 시 케이블 순차 활성화 (일시정지/재개 포함)
  useEffect(() => {
    console.log(
      `[DEBUG] 2. isAttacking: ${isAttacking}, startObject: ${startObject}, endObject: ${endObject}`
    );

    addLog(
      `[DEBUG] 2. isAttacking: ${isAttacking}, startObject: ${startObject}, endObject: ${endObject}`
    );

    // 공격 중이고 startObject, endObject가 유효한 경우에만 진행
    if (isAttacking && startObject && endObject) {
      // DDOS FLOW에서 startObject, endObject의 인덱스 반환
      let startIdx = DDOS_ATTACK_FLOW.indexOf(startObject);
      let endIdx = DDOS_ATTACK_FLOW.indexOf(endObject);

      console.log(`[DEBUG] 2. startIdx: ${startIdx}, endIdx: ${endIdx}`);

      addLog(`[DEBUG] 2. startIdx: ${startIdx}, endIdx: ${endIdx}`);
      // Attack PC가 어느쪽에 있는지 체크
      const isAttackPCStart = startObject === "Attack PC";
      const isAttackPCEnd = endObject === "Attack PC";
      const isAttackPCPresent =
        (isAttackPCStart && !isAttackPCEnd) ||
        (!isAttackPCStart && isAttackPCEnd);

      // 흐름 이어짐 체크 (lastEndObject와 이어지는 경우)
      const isFlowContinuationFromStart =
        lastEndObject === startObject && DDOS_ATTACK_FLOW.includes(endObject);
      const isFlowContinuationFromEnd =
        lastEndObject === endObject && DDOS_ATTACK_FLOW.includes(startObject);

      // 흐름 방향 결정
      let flowStartIdx = startIdx;
      let flowEndIdx = endIdx;
      let nextEndObject = endObject;

      if (isAttackPCPresent) {
        // Attack PC가 어느 쪽에 있든 시작점으로 설정
        if (isAttackPCEnd) {
          flowStartIdx = endIdx; // end를 시작으로
          flowEndIdx = startIdx; // start를 끝으로
          nextEndObject = startObject;
        }
      } else if (isFlowContinuationFromStart) {
        // 이전 끝점과 start가 이어지는 경우
        flowStartIdx = startIdx;
        flowEndIdx = endIdx;
        nextEndObject = endObject;
      } else if (isFlowContinuationFromEnd) {
        // 이전 끝점과 end가 이어지는 경우
        flowStartIdx = endIdx;
        flowEndIdx = startIdx;
        nextEndObject = startObject;
      }

      // 유효성 체크
      const isValidFlow =
        (isAttackPCPresent ||
          isFlowContinuationFromStart ||
          isFlowContinuationFromEnd) &&
        flowStartIdx !== -1 &&
        flowEndIdx !== -1;

      console.log(
        `[DEBUG] 2. isAttackPCPresent: ${isAttackPCPresent}, isFlowContinuationFromStart: ${isFlowContinuationFromStart}, isFlowContinuationFromEnd: ${isFlowContinuationFromEnd}, flowStartIdx: ${flowStartIdx}, flowEndIdx: ${flowEndIdx}, isValidFlow: ${isValidFlow}`
      );

      addLog(
        `[DEBUG] 2. isAttackPCPresent: ${isAttackPCPresent}, isFlowContinuationFromStart: ${isFlowContinuationFromStart}, isFlowContinuationFromEnd: ${isFlowContinuationFromEnd}, flowStartIdx: ${flowStartIdx}, flowEndIdx: ${flowEndIdx}, isValidFlow: ${isValidFlow}`
      );
      if (isValidFlow) {
        // 경로 내 LAN 케이블 탐색
        const cablesInPath = droppedItems
          .filter((item) => item.name === "LAN Cable")
          .map((cable, idx) => ({
            id: cable.id || idx,
            order: -1,
          }));

        console.log(
          `[DEBUG] 2. cablesInPath: ${cablesInPath
            .map((cable) => `${cable.id}(${cable.order})`)
            .join(", ")}`
        );

        addLog(
          `[DEBUG] 2. cablesInPath: ${cablesInPath
            .map((cable) => `${cable.id}(${cable.order})`)
            .join(", ")}`
        );

        // 경로 내 케이블에 순서 부여
        const totalSteps = Math.abs(flowEndIdx - flowStartIdx);
        const updatedCables = cablesInPath.map((cable, idx) => {
          const step =
            Math.floor((totalSteps / cablesInPath.length) * idx) +
            Math.min(flowStartIdx, flowEndIdx);
          return { ...cable, order: step };
        });

        console.log(
          `[DEBUG] 2. updatedCables: ${updatedCables
            .map((cable) => `${cable.id}(${cable.order})`)
            .join(", ")}`
        );

        addLog(
          `[DEBUG] 2. updatedCables: ${updatedCables
            .map((cable) => `${cable.id}(${cable.order})`)
            .join(", ")}`
        );

        // 진행 상태 초기화
        cablesInPathRef.current = updatedCables;
        if (activeCables.length === 0) currentIndexRef.current = 0;

        const activateNextCable = () => {
          if (currentIndexRef.current < cablesInPathRef.current.length) {
            const cable = cablesInPathRef.current[currentIndexRef.current];
            setActiveCables((prev) => [...prev, cable.id]);
            console.log(
              `[DEBUG] 2. Activating cable ${cable.id} at step ${cable.order}`
            );
            addLog(
              `[DEBUG] 2. Activating cable ${cable.id} at step ${cable.order}`
            );
            currentIndexRef.current += 1;

            if (currentIndexRef.current === cablesInPathRef.current.length) {
              setLastEndObject(nextEndObject);
              console.log(`[DEBUG] 2. Flow continued to: ${nextEndObject}`);
              addLog(`[DEBUG] 2. Flow continued to: ${nextEndObject}`);
            }
          } else {
            clearInterval(intervalRef.current);
          }
        };

        // 이전 타이머 정리
        if (intervalRef.current) clearInterval(intervalRef.current);

        // isPaused가 false일 때만 타이머 시작/재개
        if (!isPaused) {
          intervalRef.current = setInterval(() => {
            if (!isPaused) activateNextCable();
          }, 1000);
        }

        // isPaused 변경 감지
        if (isPaused && intervalRef.current) {
          console.log("[DEBUG] Pausing cable activation");
          addLog("[DEBUG] Pausing cable activation");
          clearInterval(intervalRef.current);
        }

        return () => {
          if (intervalRef.current) clearInterval(intervalRef.current);
        };
      }
    } else {
      console.log(`[DEBUG] 2. Resetting activeCables`);
      addLog(`[DEBUG] 2. Resetting activeCables`);
      setActiveCables([]); // 공격 안 하면 리셋
      currentIndexRef.current = 0;
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [
    isAttacking,
    isPaused,
    startObject,
    endObject,
    droppedItems,
    lastEndObject,
    setLastEndObject,
  ]);

  // 연결 상태 체크
  useEffect(() => {
    const checkConnection = () => {
      const isCloseToObject = (x, y) =>
        droppedItems.some(
          (item) =>
            item.name !== "Fabric Net" &&
            item.name !== "LAN Cable" &&
            Math.abs(item.x + 20 - x) < DISTANCE_THRESHOLD &&
            Math.abs(item.y + 20 - y) < DISTANCE_THRESHOLD
        );

      setIsStartConnected(isCloseToObject(start.x, start.y));
      setIsEndConnected(isCloseToObject(end.x, end.y));
    };
    checkConnection();
  }, [start, end, droppedItems]);

  const handleMove = useCallback((type, e) => {
    const { clientX, clientY, movementX, movementY } = e;
    const limitedX = clamp(clientX - 250, 0, window.innerWidth - 500);
    const limitedY = clamp(clientY - 75, 0, window.innerHeight - 130);

    setStart((prev) =>
      type === "start"
        ? { x: limitedX, y: limitedY }
        : type === "line"
        ? {
            x: clamp(prev.x + movementX, 0, window.innerWidth - 500),
            y: clamp(prev.y + movementY, 0, window.innerHeight - 130),
          }
        : prev
    );

    setEnd((prev) =>
      type === "end"
        ? { x: limitedX, y: limitedY }
        : type === "line"
        ? {
            x: clamp(prev.x + movementX, 0, window.innerWidth - 500),
            y: clamp(prev.y + movementY, 0, window.innerHeight - 130),
          }
        : prev
    );
  }, []);

  const handleMouseDown = (type) => (e) => {
    e.stopPropagation();
    const handleMouseMove = (event) => handleMove(type, event);
    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const minX = Math.min(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const width = Math.max(10, Math.abs(end.x - start.x));
  const height = Math.max(10, Math.abs(end.y - start.y));

  // 개별 케이블의 활성화 여부에 따라 클래스 결정
  const cableClass = activeCables.includes(id)
    ? isPaused
      ? "cable-line paused"
      : "cable-line active"
    : "cable-line";

  return (
    <>
      <div
        className="absolute"
        style={{
          left: `${minX}px`,
          top: `${minY}px`,
          width: `${width}px`,
          height: `${height}px`,
        }}
        onDoubleClick={() => onDoubleClick(id)}
      />

      <svg
        className="absolute z-10 pointer-events-none"
        style={{ left: 0, top: 0, width: "100%", height: "100%" }}
      >
        <line
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke={
            activeCables.includes(id)
              ? isPaused
                ? "#1769ff" // 일시정지
                : "#ff3333" // 활성화
              : "#C3C3C3" // 비활성화
          }
          strokeWidth="2"
          className={`cursor-move ${
            isAttacking ? "pointer-events-none" : "pointer-events-auto"
          } ${cableClass}`}
          onDoubleClick={() => onDoubleClick(id)}
          onMouseDown={handleMouseDown("line")}
        />

        <rect
          x={start.x - 3}
          y={start.y - 3}
          width="6"
          height="6"
          fill={isStartConnected ? "#1769ff" : "white"}
          stroke="black"
          className={`cursor-pointer ${
            isAttacking ? "pointer-events-none" : "pointer-events-auto"
          }`}
          onMouseDown={handleMouseDown("start")}
        />

        <rect
          x={end.x - 3}
          y={end.y - 3}
          width="6"
          height="6"
          fill={isEndConnected ? "#1769ff" : "white"}
          stroke="black"
          className={`cursor-pointer ${
            isAttacking ? "pointer-events-none" : "pointer-events-auto"
          }`}
          onMouseDown={handleMouseDown("end")}
        />
      </svg>
    </>
  );
}
