import { JSX } from "react";

export const IconButton = ({
  icon, 
  onClick,
  disabled
} : {
  icon: JSX.Element, 
  onClick: () => void,
  disabled?: boolean
}) => {
  return (
    <button disabled={!!disabled} onClick={onClick} className={`font-helvetica font-bold text-12 text-white h-[30px] w-[30px] flex justify-center items-center bg-pink rounded-lg hover:bg-purple active:opacity-75  transition-all duration-300 ease-in-out shadow-xl ${disabled ? "opacity-50" : ""}`}>
      {icon}
    </button>
  )
}