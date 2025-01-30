"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const LogBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [height, setHeight] = useState(20);
    const isDragging = useRef(false);
    const startY = useRef(0);
    const dragHandleRef = useRef(null);

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

    return (
        <div className="w-full flex flex-col">
            <div
                className="w-full h-2 bg-transparent mt-2 cursor-ns-resize relative z-10 top-1"
                ref={dragHandleRef}
                onMouseDown={handleMouseDown}
            />
            <div className="flex flex-row items-center justify-between border-t border-[#6C6C6C] bg-[#26292B] px-5 py-3">
                <p className="weight-600 text-[#D3D3D3] select-none">Log</p>
                <button onClick={() => setIsOpen(!isOpen)} className="text-[#D3D3D3] cursor-pointer">
                    {isOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                </button>
            </div>

            {isOpen && (
                <div
                    className="bg-[#1B1B1B] px-5 pt-5 pb-10 overflow-y-auto custom-scrollbar pr-8 min-h-[20vh] max-h-[40vh]"
                    style={{ height: `${height}vh` }}
                >
                    <p className="text-[#D3D3D3]">로그 내용 표시<br/>로그 내용 표시<br/>...</p>
                </div>
            )}
        </div>
    );
};
