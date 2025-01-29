import { useState } from "react";
const DefenseToggle = ({ name, enabled, onToggle }) => {
    return (
      <div className="flex items-center justify-between w-full p-4 bg-[#2A2A2A] rounded-lg">
        <span>{name}</span>
        
      </div>
    );
  };
  
  export default DefenseToggle;
  