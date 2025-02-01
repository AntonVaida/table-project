import { TableDataType } from "@/shared";
import { getRandomThreeDigitNumber } from "./getRandomThreeDigitNumber";

export const getNewRow = ({data} : {data:  TableDataType}) => {
  return  {
    rowId: `row:${data.bodyData.length + 1}`,
    rowTitle: `Cell Value M = ${data.bodyData.length + 1}`,
    rowData: Array.from({ length: data.headerData.length - 1 }, (_, indexColumn) => {
      return { id: Number(`${data.bodyData.length + 1}${indexColumn}`), amount: getRandomThreeDigitNumber() };
    })
  }
}