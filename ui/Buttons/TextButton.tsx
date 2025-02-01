export const TextButton = ({
  text, 
  onClick
} : {
  text: string, 
  onClick?: () => void
}) => {
  return (
    <button onClick={onClick} type="submit" className="font-helvetica font-bold text-12 text-white h-[45px] w-full flex justify-center items-center bg-pink rounded-lg hover:bg-purple active:opacity-75  transition-all duration-300 ease-in-out shadow-xl">
      {text}
    </button>
  )
}