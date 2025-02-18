"use client";
import React, { useState, useRef, useEffect } from "react";

const Resizable = ({ id, x, y, width, height, onResize, onDoubleClick }) => {
  const [position, setPosition] = useState({ x, y });
  const [size, setSize] = useState({ width, height });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const ref = useRef(null);
  const initialMousePosition = useRef({ x: 0, y: 0 }); // Track initial mouse position

  useEffect(() => {
    setPosition({ x, y });
    setSize({ width, height });
  }, [x, y, width, height]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        // Update position based on mouse movement and initial mouse position
        setPosition({
          x: e.clientX - initialMousePosition.current.x,
          y: e.clientY - initialMousePosition.current.y,
        });
      } else if (isResizing) {
        const limitedX = clamp(clientX - 250, 0, window.innerWidth - 340 - 250);
        const limitedY = clamp(clientY - 75, 0, window.innerHeight - 55 - 75);
        setPosition(limitedX, limitedY);
        const newWidth = Math.max(e.clientX - position.x, 50); // minimum width 50px
        const newHeight = Math.max(e.clientY - position.y, 50); // minimum height 50px
        setSize({ width: newWidth, height: newHeight });
        onResize(id, newWidth, newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    // Add mousemove and mouseup event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, position, id, onResize]);

  const handleMouseDown = (e) => {
    if (!isResizing) {
      // Calculate initial mouse position relative to the element
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
        backgroundColor: "transparent", // No fill
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={() => onDoubleClick(id)}
    >
      <div
        className="absolute bottom-0 right-0 w-6 h-6 bg-gray-500 cursor-se-resize"
        onMouseDown={(e) => {
          e.stopPropagation(); // Prevent the mouse down event from triggering drag
          setIsResizing(true);
        }}
      />
    </div>
  );
};

export default Resizable;
