import { HeaderTableDataType } from "./HeaderTableDataType";
import { BodyTableDataType } from "./BodyTableDataType";
import { FooterTableDataType } from "./FooterTableDataType";

export type TableDataType = {
  headerData: HeaderTableDataType[];
  bodyData: BodyTableDataType[];
  footerData: FooterTableDataType[];
}