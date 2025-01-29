const AttackButton = ({ name, onClick }) => {
    return (
      <button className="w-full p-4 bg-[#2A2A2A] hover:bg-[#C5C5C5] rounded-lg text-left transition-colors">
        {name}
      </button>
    );
  };
  
  export default AttackButton;