import { TableDataType } from "@/shared";
import { getRandomThreeDigitNumber } from "./getRandomThreeDigitNumber";
import { SPLIT_CELL_ID_PATTERN } from "./getTableData";

export const getDataWithNewRow = ({data} : {data:  TableDataType}) => {
  const newRow =  {
    rowId: `row:${data.bodyData.length + 1}`,
    rowTitle: `Cell Value M = ${data.bodyData.length + 1}`,
    rowData: Array.from({ length: data.headerData.length - 1 }, (_, indexColumn) => {
      return { id: Number(`${data.bodyData.length + 1}${SPLIT_CELL_ID_PATTERN}${indexColumn}`), amount: getRandomThreeDigitNumber() };
    })
  }

  return [...data.bodyData, newRow];
}