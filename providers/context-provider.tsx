"use client"
import React, { createContext } from "react";
import { useGeneralState } from "@/hooks";

export type GeneralStateType = ReturnType<typeof useGeneralState>;

export const ClientContext = createContext<(GeneralStateType) | undefined>(undefined);

export const ContextProvider = ({
  children
}: {
  children: React.ReactNode | null;
}) => {

  const data = useGeneralState();
  if (!children) return null;


  return (
    <ClientContext.Provider value={{ ...data}}>
      {children}
    </ClientContext.Provider>
  )
}