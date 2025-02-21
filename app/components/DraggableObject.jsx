"use client";

import { useDrag } from "react-dnd";
import { useState, useEffect } from "react";

export default function DraggableObject({ iconKey, id, name, initialX, initialY, onDragEnd, onDoubleClick }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "OBJECT",
        item: { iconKey, id, name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [position, setPosition] = useState({ x: initialX, y: initialY });

    useEffect(() => {
        setPosition({ x: initialX, y: initialY });
    }, [initialX, initialY]);

    const handleDragEnd = (e) => {
        const x = e.clientX - 250;
        const y = e.clientY - 75;
        setPosition({ x, y });
        onDragEnd(id, x, y);
    };

    return (
        <div
            ref={drag}
            className={`absolute z-10 cursor-move ${isDragging ? "opacity-50" : ""}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
            onMouseUp={handleDragEnd}
            onDoubleClick={() => onDoubleClick(id)}
        >
            <img src={`/icons/objects/${iconKey}.png`} alt={iconKey} className="h-7"/>
        </div>
    );
}
