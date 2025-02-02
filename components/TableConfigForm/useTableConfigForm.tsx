
import { useMemo, useEffect } from "react";
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
    handleSetColumnConfig, 
    handleSetRowConfig, 
    handleSetHighlightCount,
    columnConfig: defaultColumnConfig,
    rowConfig: defaultRowConfig,
    highlightCount
  } = useClientContext();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();
  const columnConfig = watch('columnConfig');
  const rowConfig = watch('rowConfig');

  useEffect(() => {
    reset({
      columnConfig: defaultColumnConfig,
      rowConfig: defaultRowConfig,
      highlightCount: highlightCount,
    });
  }, [defaultColumnConfig, defaultRowConfig, highlightCount, reset]);

  const onSubmitHandler = handleSubmit((data) => {
    const {columnConfig, rowConfig, highlightCount} = data;

    if (highlightCount && rowConfig && columnConfig) {
      handleSetColumnConfig(Number(columnConfig));
      handleSetRowConfig(Number(rowConfig));
      handleSetHighlightCount(Number(highlightCount));

      router.push('table')
    }
  });

 const maxHighlightCount = useMemo(() => {
    if(columnConfig !== defaultColumnConfig || rowConfig !== defaultRowConfig) {
      setValue('highlightCount', null);
    }

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