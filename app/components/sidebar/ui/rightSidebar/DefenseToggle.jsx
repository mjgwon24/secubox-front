import { Switch } from "@/app/components/sidebar/ui/rightSidebar/switch/Switch";

const DefenseToggle = ({ name, enabled, onToggle }) => {
  return (
    <div className="flex flex-row items-center justify-between w-full p-4 bg-[#2A2A2A] rounded-lg text-[#C5C5C5] text-[14px]">
      <span>{name}</span>
      <Switch checked={enabled} onChange={onToggle} />
    </div>
  );
};

export default DefenseToggle;
