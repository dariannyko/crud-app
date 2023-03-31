import { GridRowModel } from "@mui/x-data-grid";
import { News } from "../shared/types";

export const getRow = (row:GridRowModel, companySigDate: string, employeeSigDate: string ) => {
    return {
        ...row,
        companySigDate: new Date(Date.parse(companySigDate)).toISOString(),
  
        employeeSigDate: new Date(Date.parse(employeeSigDate)).toISOString(),
      } as News;
  
}