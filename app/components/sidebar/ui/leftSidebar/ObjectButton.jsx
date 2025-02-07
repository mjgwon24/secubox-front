"use client";

import {useDrag} from "react-dnd";

export const ObjectButton = ({ iconKey, name, onclick}) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: "OBJECT",
        item: {id: iconKey, name},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
       <button
           ref={drag}
           className={`w-[90px] h-[103px] bg-[#2A2A2A] rounded-lg transition-colors outline-none hover:outline hover:outline-[#C3C3C3] hover:outline-2 hover:bg-[#292E30] 
                     ${isDragging ? "opacity-50" : ""}`}
           onClick={onclick}>
           <div className="flex flex-col items-center justify-between h-full py-6">
                <img src={`/icons/objects/${iconKey}.png`} alt={name}
                     className="h-7"/>
                <p className="text-[#C5C5C5] text-[14px]">{name}</p>
           </div>
       </button>
    );
};