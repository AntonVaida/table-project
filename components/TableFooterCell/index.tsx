import { FooterTableDataType, AddIcon } from "@/shared";
import { IconButton } from "@/ui";

export const TableFooterCell = ({footerData, addRowHandler}: {footerData: FooterTableDataType, addRowHandler: () => void}) => {
  return (
    <td key={footerData.id} className="p-4 bg-slateBlue">
      <div className="font-helvetica font-bold text-12 text-white flex justify-center items-center">
        {footerData.id === "footer:sum" 
          ? <IconButton icon={<AddIcon height={20} width={20} />} onClick={addRowHandler} />
          : footerData.value
          }
      </div>
    </td>
  )
}