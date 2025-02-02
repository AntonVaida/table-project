"use client";
import { useTable } from "./useTable"
import { TableHeaderCell } from "../TableHeaderCell"
import { TableDataRow } from "../TableDataRow";
import { TableFooterCell } from "../TableFooterCell";

export const TableBoard = () => {
const { 
  data, 
  increaseHandler, 
  removeRowHandler, 
  addRowHandler,
  highlightIdList,
  setHoveredItemId
} = useTable();


  return (
    <div className="min-h-[100vh] w-full bg-white p-4 md:p-12 flex justify-center items-center">
      <div className="border-solid border-[2px] border-slateBlue bg-slateBlue rounded-xl overflow-x-auto custom-scroll">
      <table className="">
        <thead>
          <tr>
            {data?.headerData?.map(headerData => (
              <TableHeaderCell headerData={headerData} key={headerData?.id} />
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.bodyData?.map(row => (
            <TableDataRow 
              row={row} 
              key={row.rowId} 
              increaseHandler={increaseHandler} 
              removeRowHandler={removeRowHandler}
              highlightIdList={highlightIdList}
              setHoveredItemId={setHoveredItemId}
            />
          ))}
        </tbody> 
        <tfoot>
          <tr>
          {data?.footerData?.map(footerData => (
            <TableFooterCell 
              footerData={footerData} 
              key={footerData.id} 
              addRowHandler={addRowHandler} 
            />
          ))}
          </tr>
        </tfoot>
      </table>
      </div>
    </div>
  )
}