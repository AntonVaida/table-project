"use client";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Inputs } from "@/components/TableConfigForm/useTableConfigForm";

const DEFAULT_MAX_NUMBER = 1000000

export type NumberFieldProps = {
  register: UseFormRegister<Inputs>,
  name: keyof Inputs,
  errors: FieldErrors,
  maxValue: number | null,
  title: string,
  required: boolean,
  disabled: boolean,
  containerStyle?: string,
  labelStyle?: string,
  inputStyle?: string,
  placeholder: string
};

export const NumberField = ({
  register,
  name,
  errors,
  maxValue,
  title,
  required,
  disabled,
  containerStyle,
  labelStyle,
  inputStyle,
  placeholder
}: NumberFieldProps) => {

  console.log("NumberField", {
    register,
    name,
    errors,
    maxValue,
    title,
    required,
    disabled,
    containerStyle,
    labelStyle,
    inputStyle,
    placeholder
  });

  return (
    <div className={`${errors?.[name] ? 'mb-6' : ''} ${containerStyle ? containerStyle : ''}`}>
      {title ? (
        <label 
          htmlFor={name} 
          className={`font-helvetica font-bold text-8 text-white flex justify-center ${labelStyle ? labelStyle : ''}`}
        >
          {title}
        </label>
      ) : null}
      <input
        {...register(name, {
          required,
        })}
        onKeyDown={(e) => {
          const target = e.target as HTMLInputElement;
          const currentValue = target.value;
          const key = e.key;
          if (
            key === "Backspace" ||
            key === "Tab" ||
            key === "ArrowLeft" ||
            key === "ArrowRight" ||
            key === "Enter"
          ) {
            return;
          }

          const nextValue = parseInt(currentValue + key, 10);
          if (maxValue && (isNaN(nextValue) || nextValue > maxValue)) {
            e.preventDefault();
          }
        }}
        id={name}
        type="number" 
        max={maxValue ? maxValue : DEFAULT_MAX_NUMBER}
        disabled={disabled}
        className={`shadow-xl w-full h-[45px] rounded-lg outline-none bg-white focus:outline-none hover:outline-none active:outline-none  focus:bg-borderColor pl-2 mt-2 
          ${!disabled && errors?.[name] ? 'border-solid border-[2px] border-warning' : 'border-none'} 
          ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
          ${inputStyle ? inputStyle : ''}
          `}
        placeholder={placeholder}
      />
      <ErrorMessageComponent show={!!errors?.[name]} />
    </div>
  )
}

const ErrorMessageComponent = ({message = 'This field is required', show}: {message?: string, show: boolean}) => {

  if (!show) return null;

  return (
    <div className="h-2 mb-4">
      <p className="font-helvetica text-4 text-warning flex justify-center">{message}</p>
    </div>
  )
}