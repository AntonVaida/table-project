
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
    <div className="min-h-[100vh] overflow-x-auto flex justify-center items-center bg-white p-12">
      <div className="border-solid border-[2px] border-slateBlue rounded-xl overflow-hidden bg-slateBlue">
      <table>
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