import { useCallback, useEffect, useState, useMemo } from "react";
import { useClientContext } from "@/hooks";
import { getTableData, updateTableData, getDataWithNewRow, SPLIT_CELL_ID_PATTERN } from "@/utils";
import { TableDataType } from "@/shared";

export const useTable = () => {
  const {columnConfig, rowConfig, highlightCount} = useClientContext();
  const [data, setData] = useState<TableDataType | null>(null);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  useEffect(() => {
    if (!columnConfig || !rowConfig) return;

    const tableData = getTableData({columns: columnConfig, rows: rowConfig});
    setData(tableData)
  }, [columnConfig, rowConfig])

  const increaseHandler = useCallback((id: number) => {
    if (!id) return;

    const updatedBodyData = data?.bodyData?.map(row => {
      return {
        ...row,
        rowData: row?.rowData?.map(cell => {
        if (cell?.id === id) {
          return {...cell, amount: cell?.amount + 1};
        }

        return cell
      })
      }
    })

    if (updatedBodyData) {
      const updatedData = updateTableData({
        bodyData: updatedBodyData
      });

      setData(prevData => {
        if (!prevData) return null;

        return {...prevData, ...updatedData}})
    }
  }, [data])

  const removeRowHandler = useCallback((rowId: string) => {
    if (!rowId) return;

    const updatedBodyData = data?.bodyData?.filter(row => row?.rowId !== rowId);

    if (updatedBodyData) {
      const updatedData = updateTableData({
        bodyData: updatedBodyData
      });

      setData(prevData => {
        if (!prevData) return null;

        return {...prevData, ...updatedData}})
    }
  }, [data])

  const addRowHandler = useCallback(() => {
    if (!data) return;

    const updatedBodyData = getDataWithNewRow({data})

    const updatedData = updateTableData({
      bodyData: updatedBodyData
    });

    setData(prevData => {
      if (!prevData) return null;

      return {...prevData, ...updatedData}
    })
  }, [data])

  const highlightIdList = useMemo(() => {
    if (!hoveredItemId || !highlightCount) return [];
    const cellList = data?.bodyData?.map(row => row?.rowData?.map(cell => cell)).flat();
    const hoveredCell = cellList?.find(cell => cell?.id === hoveredItemId);

    if (!hoveredCell || !cellList?.length) return [];

    console.log('hoveredItemId', {hoveredItemId, boolean: `${hoveredItemId}`?.split(`${SPLIT_CELL_ID_PATTERN}`)?.[1] === `${columnConfig}`, columnConfig, chek: `${hoveredItemId}`?.split(`${SPLIT_CELL_ID_PATTERN}`)?.[1]})
    if (`${hoveredItemId}`?.split(`${SPLIT_CELL_ID_PATTERN}`)?.[1] === `${columnConfig}`) {
      const rowId = `${hoveredItemId}`?.split(`${SPLIT_CELL_ID_PATTERN}`)?.[0];
      return cellList?.filter(cell => `${cell?.id}`?.split(`${SPLIT_CELL_ID_PATTERN}`)?.[0] === rowId)?.map(cell => cell?.id);
    }

    return cellList
    .sort((cellA, cellB) => Math.abs(cellA?.amount - hoveredCell?.amount) - Math.abs(cellB.amount - hoveredCell?.amount))
    .slice(0, highlightCount)?.map(cell => cell?.id);

  }, [highlightCount, hoveredItemId, data])


  return {
    data,
    increaseHandler,
    removeRowHandler,
    addRowHandler,
    highlightIdList,
    setHoveredItemId
  }
}