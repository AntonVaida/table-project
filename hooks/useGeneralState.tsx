import { useState } from "react"

export const useGeneralState = () => {
  const [columnConfig, setColumnConfig] = useState<number | null>(null);
  const [rowConfig, setRowConfig] = useState<number | null>(null);
  const [highlightCount, setHighlightCount] = useState<number | null>(null);

  return {
    columnConfig,
    setColumnConfig,
    rowConfig,
    setRowConfig,
    highlightCount,
    setHighlightCount,
  }
}