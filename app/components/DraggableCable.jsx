"use client";

import { useCallback, useState } from "react";

export default function DraggableCable({ id, initialX, initialY, onDoubleClick }) {
    const [start, setStart] = useState({ x: initialX, y: initialY });
    const [end, setEnd] = useState({ x: initialX + 100, y: initialY + 100 });

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const handleMove = useCallback((type, e) => {
        const { clientX, clientY, movementX, movementY } = e;

        const limitedX = clamp(clientX - 250, 0, window.innerWidth - 340 - 250);
        const limitedY = clamp(clientY - 75, 0, window.innerHeight - 55 - 75);

        setStart((prev) =>
            type === "start" ? { x: limitedX, y: limitedY }
                : type === "line" ? { x: clamp(prev.x + movementX, 0, window.innerWidth - 340 - 250),
                        y: clamp(prev.y + movementY, 0, window.innerHeight - 55 - 75) }
                    : prev
        );

        setEnd((prev) =>
            type === "end" ? { x: limitedX, y: limitedY }
                : type === "line" ? { x: clamp(prev.x + movementX, 0, window.innerWidth - 340 - 250),
                        y: clamp(prev.y + movementY, 0, window.innerHeight - 55 - 75) }
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

    return (
        <>
            <div
                className="absolute border border-amber-200"
                style={{
                    left: `${minX}px`,
                    top: `${minY}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                }}
                onDoubleClick={() => onDoubleClick(id)}
            />

            {/* 절대 위치로 독립된 SVG */}
            <svg
                // className="absolute"
                className="absolute pointer-events-none"
                style={{ left: 0, top: 0, width: "100%", height: "100%" }}
            >
                <line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="#C3C3C3"
                    strokeWidth="2"
                    className="cursor-move pointer-events-auto"
                    onDoubleClick={() => onDoubleClick(id)}
                    onMouseDown={handleMouseDown("line")}
                />

                <rect
                    x={start.x - 4}
                    y={start.y - 4}
                    width="8"
                    height="8"
                    fill="white"
                    stroke="black"
                    className="cursor-pointer pointer-events-auto"
                    onMouseDown={handleMouseDown("start")}
                />

                <rect
                    x={end.x - 4}
                    y={end.y - 4}
                    width="8"
                    height="8"
                    fill="white"
                    stroke="black"
                    className="cursor-pointer pointer-events-auto"
                    onMouseDown={handleMouseDown("end")}
                />
            </svg>
        </>
    );

}
