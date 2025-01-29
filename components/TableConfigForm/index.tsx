"use client";
import { useTableConfigForm } from "./useTableConfigForm";
import { FieldsetComponent } from "@/ui";

export const TableConfigForm = () => {
  const {
    onSubmitHandler,
    fieldsConfig
  } = useTableConfigForm();

  return (
    <div className="h-[100vh] bg-white flex justify-center items-center">
      <div className="w-[400px] bg-slateBlue rounded-xl p-6 shadow-xl">
        <div className="h-full">
          <form onSubmit={(e) => {
            onSubmitHandler();
            e.preventDefault()
          }}> 
            <FieldsetComponent {...fieldsConfig} />
            <div className="my-6 w-full h-[3px] bg-white rounded-2xl" />
            <button type="submit" className="font-helvetica font-bold text-12 text-white h-[45px] w-full flex justify-center items-center bg-pink rounded-lg hover:bg-purple active:opacity-75  transition-all duration-300 ease-in-out shadow-xl">
              SAVE
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}