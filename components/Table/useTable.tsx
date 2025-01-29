import { useClientContext } from "@/hooks";
import { Cell } from "@/shared";
import { TableDataType, BodyTableDataType, FooterTableDataType } from "@/shared";
import { generateRandomThreeDigitNumber } from "@/utils";

type DataType = {
  headerData: {title: string, id: string}[];
  bodyData: {
    rowId: string,
    rowTitle: string,
    rowData: Cell[]
  }[]
  footerData: {value: string, id: string}[]
}

export const useTable = () => {
  const {columnConfig, rowConfig, highlightCount} = useClientContext();

const generateTableData = ({
  columns,
  rows,
}: {
  columns: number;
  rows: number;
}): TableDataType => {
  // Ініціалізуємо базову структуру даних
  const data: TableDataType = {
    headerData: [],
    bodyData: [],
    footerData: [],
  };

  // Генеруємо headerData
  data.headerData = Array.from({ length: columns + 2 }, (_, indexColumn) => {
    if (indexColumn === 0) {
      return { title: "", id: `col:${indexColumn}` };
    }
    if (indexColumn === columns + 1) {
      return { title: "Sum values", id: `col:${indexColumn}` };
    }
    return { title: `Cell values N = ${indexColumn}`, id: `col:${indexColumn}` };
  });

  // Масив для підрахунку значень у footerData
  const footerSums = Array(columns).fill(0);

  // Генеруємо bodyData
  data.bodyData = Array.from({ length: rows }, (_, indexRow) => {
    const rowId = `row:${indexRow + 1}`;
    const rowTitle = `Cell Value M = ${indexRow + 1}`;
    let rowTotalSum = 0;

    const rowData = Array.from({ length: columns + 1 }, (_, indexColumn) => {
      if (indexColumn === columns) {
        // Останній стовпець: сума рядка
        return { id: `${rowId}:col:${indexColumn}`, amount: rowTotalSum };
      }

      // Інші стовпці: випадкові значення
      const amount = generateRandomThreeDigitNumber();
      rowTotalSum += amount;

      // Оновлюємо підсумки для footerData
      footerSums[indexColumn] += amount;

      return { id: `${rowId}:col:${indexColumn}`, amount };
    });

    return { rowId, rowTitle, rowData };
  });

  // Генеруємо footerData
  data.footerData = [
    { id: "footer:label", value: "50th percentile" },
    ...footerSums.map((sum, indexColumn) => ({
      id: `footer:col:${indexColumn + 1}`,
      value: (sum / rows).toFixed(2), // Середнє значення у стовпці
    })),
    { id: `footer:col:${columns}`, value: "" }, // Пустий останній стовпець
  ];

  return data;
};
  const data = columnConfig && rowConfig ? generateTableData({columns: columnConfig, rows: rowConfig}) : null;

  console.log("DATAAA", data)
}