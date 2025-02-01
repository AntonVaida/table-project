import { TableDataType } from "@/shared";
import { getRandomThreeDigitNumber } from "./getRandomThreeDigitNumber";

export const getTableData = ({
  columns,
  rows,
}: {
  columns: number;
  rows: number;
}): TableDataType => {
  const data: TableDataType = {
    headerData: [],
    bodyData: [],
    footerData: [],
  };

  data.headerData = Array.from({ length: columns + 2 }, (_, indexColumn) => {
    if (indexColumn === 0) {
      return { title: "", id: `col:${indexColumn}` };
    }
    if (indexColumn === columns + 1) {
      return { title: "Sum values", id: `col:${indexColumn}` };
    }
    return { title: `Cell values N = ${indexColumn}`, id: `col:${indexColumn}` };
  });

  const footerSums = Array(columns).fill(0);

  data.bodyData = Array.from({ length: rows }, (_, indexRow) => {
    const rowId = `row:${indexRow + 1}`;
    const rowTitle = `Cell Value M = ${indexRow + 1}`;
    let rowTotalSum = 0;

    const rowData = Array.from({ length: columns + 1 }, (_, indexColumn) => {
      if (indexColumn === columns) {
        return { id: Number(`${indexRow + 1}${indexColumn}`), amount: rowTotalSum };
      }

      const amount = getRandomThreeDigitNumber();
      rowTotalSum += amount;

      footerSums[indexColumn] += amount;

      return { id: Number(`${indexRow + 1}${indexColumn}`), amount };
    });

    return { rowId, rowTitle, rowData };
  });

  data.footerData = [
    { id: "footer:label", value: "50th percentile" },
    ...footerSums.map((sum, indexColumn) => ({
      id: `footer:col:${indexColumn + 1}`,
      value: (sum / rows).toFixed(2),
    })),
    { id: "footer:sum", value: "" },
  ];

  return data;
};