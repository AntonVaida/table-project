"use client";
import { useClientContext } from "@/hooks";
import { TableBoard } from "@/components/Table";

export default function Table () {
  const {columnConfig, rowConfig, highlightCount} = useClientContext();

  console.log("Table", {columnConfig, rowConfig, highlightCount})

  return (
    <TableBoard />
  )
}