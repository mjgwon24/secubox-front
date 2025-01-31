import { Switch, ToggleButton } from "@mui/material";
import { useState } from "react";
const DefenseToggle = ({ name, enabled, onToggle }) => {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-[#2A2A2A] rounded-lg text-[#C5C5C5] text-[14px]">
      <span>{name}</span>
    </div>
  );
};

export default DefenseToggle;
