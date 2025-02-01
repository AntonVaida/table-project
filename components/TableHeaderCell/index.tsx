import { HeaderTableDataType } from "@/shared"

export const TableHeaderCell = ({headerData}: {headerData: HeaderTableDataType}) => {
  return (
     <th scope="col" key={headerData?.id} className="p-4 bg-slateBlue border-solid border-[1px] border-slateBlue">
        <div className="font-helvetica font-bold text-12 text-white flex justify-center items-center">
          {headerData?.title}
        </div>
      </th>
  )
}