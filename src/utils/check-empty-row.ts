import { GridRowModel } from "@mui/x-data-grid";

export const checkEmptyRow = (fields: GridRowModel) => {
  for (let key in fields) {
    if (fields[key as keyof GridRowModel] === "") {
      return true;
    }
  }
  return false;
};
