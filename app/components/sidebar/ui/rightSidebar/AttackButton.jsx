const AttackButton = ({ name, onClick }) => {
  return (
    <button
      className="w-full p-4 bg-[#2A2A2A] hover:bg-[#292E30] rounded-lg text-left transition-colors outline-none hover:outline hover:outline-[#C3C3C3] hover:outline-2"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default AttackButton;
