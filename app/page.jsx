"use client";

import { useDrop } from "react-dnd";
import { useCallback, useMemo, useState } from "react";
import DraggableObject from "@/app/components/DraggableObject";
import DraggableCable from "@/app/components/DraggableCable";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
    const [droppedItems, setDroppedItems] = useState([]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "OBJECT",
        drop: (item, monitor) => {
            const offset = monitor.getClientOffset();
            if (!offset) return;

            setDroppedItems((prev) => {
                const existingItem = prev.find((i) => i.id === item.id);

                if (existingItem) {
                    return prev.map((i) =>
                        i.id === item.id ? { ...i, x: offset.x - 250, y: offset.y - 75 } : i
                    );
                }

                const newItem = {
                    ...item,
                    iconKey: item.iconKey,
                    id: uuidv4(),
                    x: offset.x - 250,
                    y: offset.y - 75
                };

                return [...prev, newItem];
            });
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    // 아이템 개수 계산
    const itemCounts = useMemo(() => {
        return droppedItems.reduce((acc, item) => {
            acc[item.name] = (acc[item.name] || 0) + 1;
            return acc;
        }, {});
    }, [droppedItems]);

    // 아이템 위치 업데이트
    const handleDragEnd = useCallback((id, x, y) => {
        setDroppedItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, x, y } : item
            )
        );
    }, []);

    // 아이템 삭제 (더블 클릭 시)
    const handleRemoveItem = useCallback((id) => {
        setDroppedItems((prev) => prev.filter((item) => item.id !== id));
    }, []);

    return (
        <div ref={drop} className={`w-full h-screen p-2 relative ${isOver ? "bg-gray-700" : ""}`}>
            <div className="absolute top-3 left-3 bg-[rgba(0,0,0,0.7)] text-white p-2 rounded-lg z-50">
                <p className="text-xs font-semibold text-gray-300 pb-2 select-none">Object Count</p>
                {Object.entries(itemCounts).map(([name, count]) => (
                    <p key={name} className="text-xs text-gray-400">{name}: {count}</p>
                ))}
            </div>

            {droppedItems.map((item) =>
            item.name === "LAN Cable" ? (
                <DraggableCable
                    key={item.id}
                    id={item.id}
                    initialX={item.x}
                    initialY={item.y}
                    onDoubleClick={() => handleRemoveItem(item.id)}
                />
            ) : (
                <DraggableObject
                    key={item.id}
                    iconKey={item.iconKey}
                    id={item.id}
                    name={item.name}
                    initialX={item.x}
                    initialY={item.y}
                    onDragEnd={handleDragEnd}
                    onDoubleClick={() => handleRemoveItem(item.id)}
                />
            ))}
        </div>
    );
}
