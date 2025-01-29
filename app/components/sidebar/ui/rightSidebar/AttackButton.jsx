const AttackButton = ({ name, onClick }) => {
    return (
      <button className="w-full p-4 bg-[#2A2A2A] hover:bg-[#292E30] rounded-lg text-left transition-colors hover:border-[#C3C3C3] hover:border-2">
        {name}
      </button>
    );
  };
  
  export default AttackButton;