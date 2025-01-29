"use client";
import { NumberFieldProps, NumberField } from "../Fields/NumberField";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Inputs } from "@/components/TableConfigForm/useTableConfigForm";

interface FieldsList extends Omit<NumberFieldProps, "register" | "errors"> {
  type: string;
}

interface FieldsProps extends NumberFieldProps {
  type: string;
}

const Fields = (props: FieldsProps) => {
  const { type } = props;

  switch (type) {
    case "number":
      return <NumberField {...props} />;
    default:
      return null;
  }
}


export const FieldsetComponent = ({
  fields = [],
  wrapperCN,
  errors,
  register,
}: {
  fields: FieldsList[],
  wrapperCN?: string,
  errors: FieldErrors,
  register: UseFormRegister<Inputs>,
}) => {

  return (
    <fieldset className={wrapperCN ? wrapperCN : ''}>
      {fields?.map((field, index) => (
        <Fields {...field} key={index} register={register} errors={errors} />
      ))}
    </fieldset>
  )
}