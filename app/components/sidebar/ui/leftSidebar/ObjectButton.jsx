export const ObjectButton = ({ iconKey, name, onclick}) => {
    return (
       <button className="w-[90px] h-[103px] bg-[#2A2A2A] rounded-lg transition-colors outline-none hover:outline hover:outline-[#C3C3C3] hover:outline-2 hover:bg-[#292E30]"
         onClick={onclick}>
           <div className="flex flex-col items-center justify-between h-full py-6">
                <img src={`/icons/objects/${iconKey}.png`} alt={name}
                     className="h-7"/>
                <p className="text-[#C5C5C5] text-[14px]">{name}</p>
           </div>
       </button>
    );
};