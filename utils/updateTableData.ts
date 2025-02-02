import { TableDataType } from "@/shared";
import { SPLIT_CELL_ID_PATTERN } from "./getTableData";

export const updateTableData = ({
  bodyData,
}: {
  bodyData: TableDataType['bodyData'];
}) => {
  const columns = bodyData?.[0]?.rowData?.length - 1;
  const rows = bodyData?.length;

  const footerSums = Array(columns).fill(0);

  const updatedBodyData = bodyData.map((row, indexRow) => {
    let rowTotalSum = 0;

    const updatedRowData = row.rowData.map((cell, indexColumn) => {
      if (indexColumn === columns) {
        return { ...cell, amount: rowTotalSum, id: Number(`${indexRow + 1}${SPLIT_CELL_ID_PATTERN}${indexColumn}`) };
      }

      rowTotalSum += cell.amount;
      footerSums[indexColumn] += cell.amount;

      return {...cell, id: Number(`${indexRow + 1}${SPLIT_CELL_ID_PATTERN}${indexColumn}`)};
    });

    return { ...row, rowData: updatedRowData };
  });

  const updatedFooterData = [
    { id: "footer:label", value: "50th percentile" },
    ...footerSums.map((sum, indexColumn) => ({
      id: `footer:col:${indexColumn + 1}`,
      value: (sum / rows).toFixed(2),
    })),
    { id: "footer:sum", value: "" },
  ];

  return {
    bodyData: updatedBodyData,
    footerData: updatedFooterData,
  };
};