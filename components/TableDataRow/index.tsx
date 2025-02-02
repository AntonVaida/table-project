import { Dispatch, SetStateAction } from "react"
import { BodyTableDataType, RemoveIcon} from "@/shared"
import { IconButton } from "@/ui"
import { DataCell } from "../DataCell"
import { DataCellSum } from "../DataCellSum"
import { useTableDataRow } from "./useTableDataRow"

export const TableDataRow = ({
  row, 
  increaseHandler,
  removeRowHandler,
  highlightIdList,
  setHoveredItemId
}: {
  row: BodyTableDataType, 
  increaseHandler: (id: number) => void,
  removeRowHandler: (rowId: string) => void,
  highlightIdList: number[],
  setHoveredItemId: Dispatch<SetStateAction<number | null>>

}) => {
  const {
    hoveredSumValue,
    setHoveredSumValue
  } = useTableDataRow();

  return (
    <tr key={row.rowId}>
      <th scope="row" className="p-4 bg-slateBlue border-solid border-[1px] border-slateBlue">
        <div className="font-helvetica font-bold text-12 text-white flex justify-center items-center ">
          {row.rowTitle}
        </div>
      </th>
      {row?.rowData?.map((cell, index) => {
        if (row?.rowData?.length - 1 === index) {
          return <DataCellSum 
            key={cell?.id} 
            increaseHandler={increaseHandler} 
            cell={cell}
            setHoveredSumValue={setHoveredSumValue}
            setHoveredItemId={setHoveredItemId}
            highlightIdList={highlightIdList}
          />
        } else {
          return <DataCell 
            key={cell?.id} 
            increaseHandler={increaseHandler} 
            cell={cell}
            highlightIdList={highlightIdList}
            setHoveredItemId={setHoveredItemId}
            hoveredSumValue={hoveredSumValue}
          />
        }
      })}
      <td className="pr-4">
        <IconButton icon={<RemoveIcon height={20} width={20} />} onClick={() => removeRowHandler(row?.rowId)} />
      </td>
    </tr>
  )
}