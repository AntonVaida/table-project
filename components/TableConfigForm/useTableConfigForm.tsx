import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useClientContext } from "@/hooks";
import { useRouter } from "next/navigation";

const MAX_COLUMN_NUMBER = 100;
const MAX_ROW_NUMBER = 100;

export type Inputs = {
  columnConfig: number | null
  rowConfig: number | null
  highlightCount: number | null
}

export const useTableConfigForm = () => {
  const {
    setColumnConfig, 
    setRowConfig, 
    setHighlightCount,
    columnConfig: defaultColumnConfig,
    rowConfig: defaultRowConfig,
    highlightCount
  } = useClientContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      columnConfig: defaultColumnConfig,
      rowConfig: defaultRowConfig,
      highlightCount: highlightCount
    }
  });

  const router = useRouter();
  const columnConfig = watch('columnConfig');
  const rowConfig = watch('rowConfig');

  const onSubmitHandler = handleSubmit((data) => {
    const {columnConfig, rowConfig, highlightCount} = data;

    if (highlightCount && rowConfig && columnConfig) {
      setColumnConfig(Number(columnConfig));
      setRowConfig(Number(rowConfig));
      setHighlightCount(Number(highlightCount));

      router.push('table')
    }
  });

 const maxHighlightCount = useMemo(() => {
    if (columnConfig && rowConfig) {
      return Number(columnConfig) * Number(rowConfig);
    } 

    return null;
  }, [columnConfig, rowConfig]);


  const fieldsConfig = {
    fields: [
      {
        name: "columnConfig" as keyof Inputs,
        maxValue: MAX_COLUMN_NUMBER,
        title: "Column Count",
        required: true,
        disabled: false,
        placeholder: "Max Column Count - 100",
        type: "number"
      },
      {
        name: "rowConfig" as keyof Inputs,
        maxValue: MAX_ROW_NUMBER,
        title: "Row Count",
        required: true,
        disabled: false,
        placeholder: "Max Row Count - 100",
        type: "number"
      },
      {
        name: "highlightCount" as keyof Inputs,
        maxValue: maxHighlightCount,
        title: "X - koefficient",
        required: true,
        disabled: !maxHighlightCount,
        placeholder: maxHighlightCount ? `Max X koefficientt - ${maxHighlightCount}` : 'X koefficientt',
        type: "number",
        containerStyle: "mb-0"
      },
    ],
    wrapperCN: "",
    errors,
    register,
  }


  return {
    onSubmitHandler,
    fieldsConfig
  }
}