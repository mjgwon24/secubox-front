"use client";

import { useCallback, useState } from "react";

export default function DraggableCable({ id, initialX, initialY, onDoubleClick }) {
    const [start, setStart] = useState({ x: initialX, y: initialY });
    const [end, setEnd] = useState({ x: initialX + 100, y: initialY + 100 });

    const handleMove = useCallback((type, e) => {
        const { clientX, clientY, movementX, movementY } = e;

        setStart((prev) =>
            type === "start" ? { x: clientX - 250, y: clientY - 75 }
                : type === "line" ? { x: prev.x + movementX, y: prev.y + movementY }
                    : prev
        );

        setEnd((prev) =>
            type === "end" ? { x: clientX - 250, y: clientY - 75 }
                : type === "line" ? { x: prev.x + movementX, y: prev.y + movementY }
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
        <div
            className="absolute"
            style={{
                left: `${minX}px`,
                top: `${minY}px`,
                width: `${width}px`,
                height: `${height}px`,
            }}
            onDoubleClick={() => onDoubleClick(id)}
        >
            <svg className="absolute w-full h-full" viewBox={`0 0 ${width} ${height}`}>
                <line
                    x1={start.x - minX}
                    y1={start.y - minY}
                    x2={end.x - minX}
                    y2={end.y - minY}
                    stroke="#C3C3C3"
                    strokeWidth="3"
                    className="cursor-move"
                    onMouseDown={handleMouseDown("line")}
                />

                <circle
                    cx={start.x - minX}
                    cy={start.y - minY}
                    r="10"
                    fill="blue"
                    className="cursor-pointer"
                    onMouseDown={handleMouseDown("start")}
                />

                <circle
                    cx={end.x - minX}
                    cy={end.y - minY}
                    r="10"
                    fill="red"
                    className="cursor-pointer"
                    onMouseDown={handleMouseDown("end")}
                />
            </svg>
        </div>
    );
}
