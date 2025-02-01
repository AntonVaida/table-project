import { useState } from "react"

export const useTableDataRow = () => {
  const [hoveredSumValue, setHoveredSumValue] = useState<number | null>(null);

  return {
    hoveredSumValue,
    setHoveredSumValue
  }
}