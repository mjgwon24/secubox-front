"use client";

import { useCallback, useEffect, useState } from "react";
import { useAttack } from "@/app/AttackContext";

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
  const [start, setStart] = useState({ x: initialX, y: initialY });
  const [end, setEnd] = useState({ x: initialX + 100, y: initialY + 100 });
  const [isStartConnected, setIsStartConnected] = useState(false);
  const [isEndConnected, setIsEndConnected] = useState(false);
  const { isAttacking, isPaused, isArranged } = useAttack();

  useEffect(() => {
    if (isArranged) {
      console.log(startX);
      setStart({ x: startX, y: startY });
      setEnd({ x: endX, y: endY });
      setIsEndConnected(true);
    }
  }, [isArranged]);

  const DISTANCE_THRESHOLD = 30;
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  useEffect(() => {
    const checkConnection = () => {
      const isCloseToObject = (x, y) => {
        return droppedItems.some(
          (item) =>
            item.name !== "Fabric Net" &&
            item.name !== "LAN Cable" &&
            Math.abs(item.x + 20 - x) < DISTANCE_THRESHOLD &&
            Math.abs(item.y + 20 - y) < DISTANCE_THRESHOLD
        );
      };

      setIsStartConnected(isCloseToObject(start.x, start.y));
      setIsEndConnected(isCloseToObject(end.x, end.y));
    };

    checkConnection();
  }, [start, end, droppedItems]);

  const handleMove = useCallback((type, e) => {
    const { clientX, clientY, movementX, movementY } = e;

    const limitedX = clamp(clientX - 250, 0, window.innerWidth - 250 - 250);
    const limitedY = clamp(clientY - 75, 0, window.innerHeight - 55 - 75);

    setStart((prev) =>
      type === "start"
        ? { x: limitedX, y: limitedY }
        : type === "line"
        ? {
            x: clamp(prev.x + movementX, 0, window.innerWidth - 340 - 250),
            y: clamp(prev.y + movementY, 0, window.innerHeight - 55 - 75),
          }
        : prev
    );

    setEnd((prev) =>
      type === "end"
        ? { x: limitedX, y: limitedY }
        : type === "line"
        ? {
            x: clamp(prev.x + movementX, 0, window.innerWidth - 340 - 250),
            y: clamp(prev.y + movementY, 0, window.innerHeight - 55 - 75),
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

  const cableClass =
    isAttacking && isStartConnected && isEndConnected
      ? isPaused
        ? "cable-line paused" // 일시정지
        : "cable-line active" // 공격 진행 중
      : "cable-line"; // 공격 중지 또는 연결되지 않은 경우

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
            isAttacking && isStartConnected && isEndConnected
              ? "#ff3333"
              : "#C3C3C3"
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
