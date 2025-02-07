"use client";

import { useDrop } from "react-dnd";
import { useState } from "react";
import DraggableObject from "@/app/components/DraggableObject";

export default function Home() {
    const [droppedItems, setDroppedItems] = useState([]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "OBJECT",
        drop: (item, monitor) => {
            const offset = monitor.getClientOffset();
            if (!offset) return;

            setDroppedItems((prev) => [
                ...prev,
                { ...item, x: offset.x - 250, y: offset.y - 75 }
            ]);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }));

    const itemCounts = droppedItems.reduce((acc, item) => {
        acc[item.name] = (acc[item.name] || 0) + 1;
        return acc;
    }, {});

    return (
        <div ref={drop} className={`w-full h-screen p-2 relative ${isOver ? "bg-gray-700" : ""}`}>
            <div className="absolute top-3 left-3 bg-[rgba(0,0,0,0.7)] text-white p-2 rounded-lg z-50">
                <p className="text-xs weight-600 text-[#D3D3D3] pb-2">Object Count</p>

                {Object.entries(itemCounts).map(([name, count]) => (
                    <p key={name} className="text-xs text-[#C5C5C5]">{name}: {count}</p>
                ))}
            </div>

            {/* 개선점
                1. 드롭한 아이콘이 영역을 벗어날 시, 상단으로 튀어나오는 상황 발생함
                2. 드롭한 아이콘을 다시 드래그(이동)할 수 있도록 수정
                3. 드롭한 아이콘을 삭제할 수 있도록 기능 추가
                4. 랜선과 같은 것들은 선으로 모양이 변경되어야 함
            */}
            {droppedItems.map((item, index) => (
                <DraggableObject key={index} id={item.id} name={item.name} initialX={item.x} initialY={item.y} />
            ))}
        </div>
    );
}
