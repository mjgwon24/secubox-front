"use client";

import { useDrag } from "react-dnd";
import { useState } from "react";

export default function DraggableObject({ id, name, initialX, initialY }) {
    const [position, setPosition] = useState({ x: initialX, y: initialY });

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "OBJECT",
        item: { id, name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    const handleDrag = (event) => {
        setPosition({
            x: event.clientX - 20,
            y: event.clientY - 20
        });
    };

    return (
        <div
            ref={drag}
            className="absolute cursor-move"
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
                opacity: isDragging ? 0.5 : 1
            }}
            onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
        >
            <img src={`/icons/objects/${id}.png`} alt={name} className="h-10 w-10" />
        </div>
    );
}
