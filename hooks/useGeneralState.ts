import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const STORAGE_CONFIG_DATA = "tableConfig";

export const useGeneralState = () => {
  const {value: storageValue, updateValue} = useLocalStorage<{columnConfig?: number, rowConfig?: number, highlightCount?: number | null} | null>(STORAGE_CONFIG_DATA, null);
  const [columnConfig, setColumnConfig] = useState<number | null>(() => storageValue?.columnConfig ? storageValue?.columnConfig : null);
  const [rowConfig, setRowConfig] = useState<number | null>(() => storageValue?.rowConfig ? storageValue?.rowConfig : null);
  const [highlightCount, setHighlightCount] = useState<number | null>(() => storageValue?.highlightCount ? storageValue?.highlightCount : null);

  const handleSetColumnConfig = (value: number) => {
    updateValue((prev) => ({...prev, columnConfig: value}));
    setColumnConfig(value);
  }

  const handleSetRowConfig = (value: number) => {
    updateValue((prev) => ({...prev, rowConfig: value}));
    setRowConfig(value);
  }

  const handleSetHighlightCount = (value: number | null) => {
    updateValue((prev) => ({...prev, highlightCount: value}));
    setHighlightCount(value);
  }

  return {
    columnConfig,
    handleSetColumnConfig,
    rowConfig,
    handleSetRowConfig,
    highlightCount,
    handleSetHighlightCount,
  }
}