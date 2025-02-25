const AttackButton = ({ id, name, onClick, clicked, onDoubleClick }) => {
  return (
    <button
      className={`w-full p-4 rounded-lg text-left text-[14px] transition-colors outline-none
        ${
          clicked
            ? "bg-[#292E30] text-[#C5C5C5] outline-[#C3C3C3] outline-2" // 클릭 후 고정된 스타일
            : "bg-[#2A2A2A] text-[#C5C5C5] hover:bg-[#292E30] hover:outline-[#C3C3C3] hover:outline-2"
        }`}
      onDoubleClick={() => onDoubleClick(id)}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default AttackButton;
