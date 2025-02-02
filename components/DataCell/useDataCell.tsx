import { useEffect, useMemo, useRef, Dispatch, SetStateAction } from "react";
import { Cell } from "@/shared";

export const useDataCell = ({
  cell,
  setHoveredItemId,
  highlightIdList,
  hoveredSumValue
}: {
  cell: Cell,
  highlightIdList: number[],
  setHoveredItemId: Dispatch<SetStateAction<number | null>>,
  hoveredSumValue: number | null
  }) => {
  const cellRef = useRef<HTMLTableCellElement>(null);

  useEffect(() => {
    const element = cellRef.current;
    if (!element) return;

    const handleMouseEnter = () => setHoveredItemId(cell?.id);
    const handleMouseLeave = () => setHoveredItemId(null);

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cell]);

  const isHighlighted = useMemo(() => (highlightIdList?.includes(cell?.id)), [highlightIdList, cell]);

  const percentageValue = useMemo(() => {
    if (!cell || !hoveredSumValue) return 0;

    return Number(((cell?.amount / hoveredSumValue) * 100).toFixed(1));
  }, [hoveredSumValue, cell])

  return {
    cellRef,
    isHighlighted,
    percentageValue
  }
}