import { Cell } from "@/shared";
import { useDataCellSum } from "./useDataCellSum";
export const DataCellSum = ({
  cell, 
  increaseHandler,
  setHoveredSumValue,
  setHoveredItemId,
  highlightIdList
} : {
  cell: Cell, 
  increaseHandler: (id: number) => void,
  setHoveredSumValue: (value: number | null) => void,
  setHoveredItemId: (id: number | null) => void,
  highlightIdList: number[]
}) => {
  const { cellRef, isHighlighted } = useDataCellSum({ 
    cell, 
    setHoveredSumValue, 
    setHoveredItemId, 
    highlightIdList 
  });

  return (
    <td ref={cellRef} onClick={() => increaseHandler(cell.id)} key={cell.id} className={`p-4 border-solid border-[1px] border-slateBlue cursor-pointer transition-colors duration-300 ${
        isHighlighted ? "text-pink" : "text-white"
      }`}>
      <div className={`font-helvetica font-bold text-12 flex justify-center items-center`}>
        {cell.amount}
      </div>
    </td> 
  )
}