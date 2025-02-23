"use client";
import React, { useState, useRef, useEffect } from "react";

const Resizable = ({ id, x, y, width, height, onResize, onDoubleClick }) => {
  const boundaryPaddingX = 250;
  const boundaryPaddingY = 75;
  const elementMinWidth = 50;
  const elementMinHeight = 50;

  const [maxWidth, setMaxWidth] = useState(
    window.innerWidth - boundaryPaddingX * 2
  );
  const [maxHeight, setMaxHeight] = useState(
    window.innerHeight - boundaryPaddingY * 2
  );

  const [position, setPosition] = useState({ x, y });
  const [size, setSize] = useState({ width, height });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const ref = useRef(null);
  const initialMousePosition = useRef({ x: 0, y: 0 });

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  // 윈도우 크기 변경 시 최대 크기 업데이트
  useEffect(() => {
    const updateMaxSize = () => {
      setMaxWidth(window.innerWidth - boundaryPaddingX * 2);
      setMaxHeight(window.innerHeight - boundaryPaddingY * 2);
    };

    window.addEventListener("resize", updateMaxSize);
    return () => window.removeEventListener("resize", updateMaxSize);
  }, []);

  useEffect(() => {
    setPosition({
      x: clamp(x, boundaryPaddingX, maxWidth - width),
      y: clamp(y, boundaryPaddingY, maxHeight - height),
    });
    setSize({
      width: clamp(width, elementMinWidth, maxWidth),
      height: clamp(height, elementMinHeight, maxHeight),
    });
  }, [x, y, width, height, maxWidth, maxHeight]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const limitedX = clamp(
          e.clientX - boundaryPaddingX,
          0,
          window.innerWidth - boundaryPaddingX * 2 - size.width
        );
        const limitedY = clamp(
          e.clientY - boundaryPaddingY,
          0,
          window.innerHeight - boundaryPaddingY * 2 - size.height
        );

        setPosition({ x: limitedX, y: limitedY });
      } else if (isResizing) {
        const newWidth = clamp(
          e.clientX - position.x,
          elementMinWidth,
          maxWidth
        );
        const newHeight = clamp(
          e.clientY - position.y,
          elementMinHeight,
          maxHeight
        );
        setSize({ width: newWidth, height: newHeight });
        onResize(id, newWidth, newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    isResizing,
    position,
    size,
    maxWidth,
    maxHeight,
    id,
    onResize,
  ]);

  const handleMouseDown = (e) => {
    if (!isResizing) {
      initialMousePosition.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
      setIsDragging(true);
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={ref}
      className={`absolute border border-gray-500 cursor-move ${
        isDragging ? "opacity-50" : ""
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        backgroundColor: "transparent",
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={() => onDoubleClick(id)}
    >
      <div
        className="absolute bottom-0 right-0 w-6 h-6 bg-gray-500 cursor-se-resize"
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsResizing(true);
        }}
      />
    </div>
  );
};

export default Resizable;
