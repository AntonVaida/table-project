import { useCallback, useEffect, useState, useMemo } from "react";
import { useClientContext } from "@/hooks";
import { getTableData, updateTableData, getNewRow } from "@/utils";
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

    const newRow = getNewRow({data})

    const updatedBodyData = [...data.bodyData, newRow];

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

    if (Number(`${hoveredItemId}`?.slice(-1)) === columnConfig) {
      const rowId = `${hoveredItemId}`?.slice(0, 1);
      return cellList?.filter(cell => `${cell?.id}`?.slice(0, 1) === rowId)?.map(cell => cell?.id);
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