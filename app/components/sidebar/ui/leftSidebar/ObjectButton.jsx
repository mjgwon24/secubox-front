"use client";

import { useDrag } from "react-dnd";
import { v4 as uuidv4} from "uuid";

export const ObjectButton = ({ iconKey, name, onDragStart }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "OBJECT",
        item: onDragStart ? onDragStart() : { id: uuidv4(), name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <button
            ref={drag}
            className={`w-[90px] h-[103px] bg-[#2A2A2A] rounded-lg transition-colors outline-none 
                hover:outline hover:outline-[#C3C3C3] hover:outline-2 hover:bg-[#292E30] 
                ${isDragging ? "opacity-50" : ""}`}
        >
            <div className="flex flex-col items-center justify-between h-full py-6">
                <img src={`/icons/objects/${iconKey}.png`} alt={name} className="h-7" />
                <p className="text-[#C5C5C5] text-[14px]">{name}</p>
            </div>
        </button>
    );
};