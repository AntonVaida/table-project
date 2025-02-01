import { Dispatch, SetStateAction } from "react"
import { Cell } from "@/shared"
import { useDataCell } from "./useDataCell"

export const DataCell = ({
  cell, 
  increaseHandler,
  highlightIdList,
  setHoveredItemId,
  hoveredSumValue
} : {
  cell: Cell, 
  increaseHandler: (id: number) => void,
  highlightIdList: number[],
  setHoveredItemId: Dispatch<SetStateAction<number | null>>
  hoveredSumValue: number | null
}) => {
  const { 
    cellRef, 
    isHighlighted, 
    percentageValue 
  } = useDataCell({
    cell, 
    setHoveredItemId, 
    highlightIdList, 
    hoveredSumValue
  });

  return (
    <td 
      ref={cellRef} 
      onClick={() => increaseHandler(cell.id)} 
      key={cell.id} 
      className={`p-4 border-solid border-[1px] border-slateBlue cursor-pointer transition-colors duration-300 ${
        isHighlighted ? "bg-pink text-white" : "bg-white text-slateBlue"
      }`}
    >
      <div 
        className="font-helvetica font-bold text-12 flex justify-center items-center"
      >
        {percentageValue && isHighlighted ? `${percentageValue}%` : cell.amount}
      </div>
    </td>
  )
}