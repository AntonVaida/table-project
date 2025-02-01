import { useRef, useEffect, useMemo } from "react";
import { Cell } from "@/shared";

export const useDataCellSum = ({
  cell,
  setHoveredSumValue,
  setHoveredItemId,
  highlightIdList
}: {
  cell: Cell,
  setHoveredSumValue: (value: number | null) => void,
  setHoveredItemId: (id: number | null) => void,
  highlightIdList: number[]
}) => {
  const cellRef = useRef<HTMLTableCellElement>(null);

  useEffect(() => {
    const element = cellRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      setHoveredSumValue(cell?.amount);
      setHoveredItemId(cell?.id);
    };
    const handleMouseLeave = () => {
      setHoveredSumValue(null);
      setHoveredItemId(null)
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const isHighlighted = useMemo(() => {
    return highlightIdList?.includes(cell?.id)
  }, [cell, highlightIdList]);

  return {
    cellRef,
    isHighlighted
  }
}