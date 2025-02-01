import { JSX } from "react";

export const IconButton = ({
  icon, 
  onClick
} : {
  icon: JSX.Element, 
  onClick: () => void
}) => {
  return (
    <button onClick={onClick} className="font-helvetica font-bold text-12 text-white h-[30px] w-[30px] flex justify-center items-center bg-pink rounded-lg hover:bg-purple active:opacity-75  transition-all duration-300 ease-in-out shadow-xl">
      {icon}
    </button>
  )
}