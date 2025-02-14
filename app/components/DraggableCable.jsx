"use client";

import { useDrag } from "react-dnd";
import { useState, useEffect } from "react";

export default function DraggableCable({ id, initialX, initialY, onDoubleClick }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "CABLE",
        item: { id },

        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    const [start, setStart] = useState({ x: initialX, y: initialY });
    const [end, setEnd] = useState({ x: initialX + 100, y: initialY + 100 });

    const [draggingStart, setDraggingStart] = useState(false);
    const [draggingEnd, setDraggingEnd] = useState(false);
    const [draggingLine, setDraggingLine] = useState(false);

    // 드래그 시작 이벤트
    const handleMouseDown = (type) => (e) => {
        e.stopPropagation();

        if (type === "start") {
            setDraggingStart((prev) => !prev);
        }
        if (type === "end") {
            setDraggingEnd((prev) => !prev);
        }
        if (type === "line") {
            console.log("handleMouseDown - line 실행됨");
            setDraggingLine((prev) => !prev);
            handleMouseMove(e);
        }
    };

    const handleMouseMove = (e) => {
        if (draggingStart) {
            setStart(() => ({ x: e.clientX - 250, y: e.clientY - 75 }));
        }
        if (draggingEnd) {
            setEnd(() => ({ x: e.clientX - 250, y: e.clientY - 75 }));
        }
        if (draggingLine) {
            console.log("draggingLine: ", draggingLine);
            console.log("handleMouseMove 실행됨");
            const offsetX = e.movementX;
            const offsetY = e.movementY;

            setStart((prev) => ({ x: prev.x + offsetX, y: prev.y + offsetY }));
            setEnd((prev) => ({ x: prev.x + offsetX, y: prev.y + offsetY }));
        }
    };


    const handleMouseUp = () => {
        console.log("handleMouseUp 실행됨");
        setDraggingStart(false);
        setDraggingEnd(false);
        setDraggingLine(false);
    };

    useEffect(() => {
        console.log("[1] useEffect start");

        if (draggingStart || draggingEnd || draggingLine) {
            console.log("[2] add event listener");
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            console.log("remove event listener");
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [draggingStart, draggingEnd, draggingLine]);

    // 선이 차지하는 영역 크기 계산
    const minX = Math.min(start.x, end.x);
    const minY = Math.min(start.y, end.y);
    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);

    return (
        <div
            ref={drag}
            className="absolute"
            style={{
                left: `${minX}px`,
                top: `${minY}px`,
                width: `${width}px`,
                height: `${height}px`,
                pointerEvents: "auto"
            }}
            onDoubleClick={() => onDoubleClick(id)}
        >
            <svg className="absolute w-full h-full">
                <line
                    x1={start.x - minX}
                    y1={start.y - minY}
                    x2={end.x - minX}
                    y2={end.y - minY}
                    stroke="#C3C3C3"
                    strokeWidth="2"
                    className={`cursor-move ${isDragging ? "opacity-50" : ""}`}
                    onMouseDown={handleMouseDown("line")}
                />

                <circle
                    cx={start.x - minX}
                    cy={start.y - minY}
                    r="5"
                    fill="blue"
                    className="cursor-pointer"
                    onMouseDown={handleMouseDown("start")}
                />

                <circle
                    cx={end.x - minX}
                    cy={end.y - minY}
                    r="5"
                    fill="red"
                    className="cursor-pointer"
                    onMouseDown={handleMouseDown("end")}
                />
            </svg>
        </div>
    );
}
