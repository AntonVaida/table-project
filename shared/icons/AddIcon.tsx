export const AddIcon = ({width, height}: {width?: number, height?: number}) => {
  return (
    <svg width={`${width ? width : 800}px`} height={`${height ? height : 800}px`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="#384D6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}