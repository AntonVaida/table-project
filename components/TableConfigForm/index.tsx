"use client";
import { useTableConfigForm } from "./useTableConfigForm";
import { FieldsetComponent, TextButton } from "@/ui";

export const TableConfigForm = () => {
  const {
    onSubmitHandler,
    fieldsConfig
  } = useTableConfigForm();


  return (
    <div className="h-[100vh] bg-white flex justify-center items-center p-4">
      <div className="w-[400px]  bg-slateBlue rounded-xl p-6 shadow-xl">
        <div className="h-full">
          <form onSubmit={(e) => {
            onSubmitHandler();
            e.preventDefault()
          }}> 
            <FieldsetComponent {...fieldsConfig} />
            <div className="my-6 w-full h-[3px] bg-white rounded-2xl" />
            <TextButton text={"SAVE"} />
          </form>
        </div>
      </div>
    </div>
  )
}