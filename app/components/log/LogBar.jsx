"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useAttack } from "@/app/AttackContext";
import { useLog } from "@/app/LogContext";

export const LogBar = () => {
  const { isAttacking } = useAttack();
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(20);
  const { logs, addLog, startDefense } = useLog(); // 로그 배열 가져오기
  const isDragging = useRef(false);
  const startY = useRef(0);
  const dragHandleRef = useRef(null);
  const logContainerRef = useRef(null);

  useEffect(() => {
    if (isAttacking) {
      setIsOpen(true);
    }
  }, [isAttacking, addLog, startDefense]);

  /**
   * 로그창 리사이즈 핸들러
   */
  const handleMouseDown = (e) => {
    if (dragHandleRef.current && e.target !== dragHandleRef.current) return;
    e.preventDefault();
    isDragging.current = true;
    startY.current = e.clientY;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const screenHeight = window.innerHeight;
    const diffVh = ((startY.current - e.clientY) / screenHeight) * 100;
    setHeight((prevHeight) => Math.max(20, Math.min(40, prevHeight + diffVh)));
    startY.current = e.clientY;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // 새로운 로그가 추가될 때 자동 스크롤
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full flex flex-col">
      {/* 리사이즈 핸들 */}
      <div
        className="w-full h-2 bg-transparent mt-2 cursor-ns-resize relative z-10 top-1"
        ref={dragHandleRef}
        onMouseDown={handleMouseDown}
      />

      {/* 로그 타이틀 & 열기/닫기 버튼 */}
      <div className="flex flex-row items-center justify-between border-t border-[#6C6C6C] bg-[#26292B] px-5 py-3">
        <p className="font-semibold text-[#D3D3D3] select-none">Log</p>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#D3D3D3] cursor-pointer"
        >
          {isOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>
      </div>

      {/* 로그 리스트 출력 */}
      {isOpen && (
        <div
          ref={logContainerRef} // 자동 스크롤을 위한 ref
          className="bg-[#1B1B1B] px-5 pt-5 pb-10 overflow-y-auto custom-scrollbar pr-8 min-h-[20vh] max-h-[40vh]"
          style={{ height: `${height}vh` }}
        >
          {logs.length === 0 ? (
            <p className="text-gray-500">
              🚀 로그가 없습니다. 이벤트를 발생시키세요.
            </p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="text-[#D3D3D3] text-sm">
                {log} {/* 단순히 string 출력 */}
              </p>
            ))
          )}
        </div>
      )}
    </div>
  );
};
