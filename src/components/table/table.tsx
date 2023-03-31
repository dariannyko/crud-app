import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { editCurrentNews } from "../../store/news-slice/news-slice";
import { RootState, useAppDispatch } from "../../store/store";
import { DeleteRow } from "../delete-row";
import { EmptyTable } from "../empty-table/empty-table";
import { SnackBar } from "../snack-bar";
import { getRow } from "../../utils/get-row";
import { sendRequest } from "../../utils/send-request";
import { checkEmptyRow } from "../../utils/check-empty-row";
import { fillSnackbar } from "../../utils/fill-snackbar";
import { StyledDataGrid } from "./table-styles";
import {
  query,
  REQUESt_METHOD,
  REQUEST_STATUS,
  REQUESt_URL,
} from "../../shared/api";

import { Box, AlertProps, CircularProgress } from "@mui/material";
import { useDemoData } from "@mui/x-data-grid-generator";
import { GridColDef, GridRowModel } from "@mui/x-data-grid";

interface TableProps {
  userToken: string | null;
}

const Table = ({ userToken }: TableProps) => {
  const { news, getStatus } = useSelector(
    (state: RootState) => state.newsSlice
  );
  const [snackbar, setSnackbar] = useState<Pick<AlertProps,"children" | "severity"> | null>(null);
  const dispatch = useAppDispatch();

  const columns: GridColDef[] = [
    {
      field: "companySigDate",
      headerName: "Подписано компанией",
      type: "dateTime",
      width: 230,
      editable: true,
      valueGetter: (params) => new Date(Date.parse(params.row.companySigDate)),
    },
    {
      field: "companySignatureName",
      headerName: "Документ",
      width: 180,
      editable: true,
    },
    {
      field: "documentName",
      headerName: "Название",
      width: 180,
      editable: true,
    },
    {
      field: "documentStatus",
      headerName: "Статус",
      width: 180,
      editable: true,
    },
    {
      field: "documentType",
      headerName: "Тип документа",
      width: 190,
      editable: true,
    },
    {
      field: "employeeSigDate",
      headerName: "Подписано сотрудником",
      type: "dateTime",
      width: 230,

      editable: true,
      valueGetter: (params) => new Date(Date.parse(params.row.employeeSigDate)),
    },
    {
      field: "employeeSignatureName",
      headerName: "Документ",
      width: 150,
      editable: true,
    },
    {
      field: "employeeNumber",
      headerName: "Номер сотрудника",
      headerAlign: "left",
      type: "number",
      width: 180,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Удалить",
      width: 120,
      editable: false,
      type: "actions",
      renderCell: (params) => (
        <DeleteRow {...{ params, userToken, setSnackbar }} />
      ),
    },
  ];

  const processRowUpdate = useCallback(
    async (newRow: GridRowModel, oldRow: GridRowModel) => {
      if (JSON.stringify(newRow) === JSON.stringify(oldRow)) {
        return oldRow;
      }

      const isEmpty = checkEmptyRow(newRow);
      if (isEmpty) {
        setSnackbar(fillSnackbar("Нужно заполнить поле", "error"));
        return oldRow;
      }
      const editedRow = getRow(
        newRow,
        newRow.companySigDate,
        newRow.employeeSigDate
      );

      try {
        const jsonBody = JSON.stringify(editedRow);
        const result = await sendRequest(
          `${query}${REQUESt_URL.set}${newRow.id}`,
          REQUESt_METHOD.post,
          userToken,
          jsonBody
        );
        dispatch(editCurrentNews(editedRow));
        setSnackbar(fillSnackbar("Данные успешно добавлены", "success"));
        return newRow;
      } catch (error) {
        setSnackbar(fillSnackbar((error as Error).message, "error"));
        return oldRow;
      }
    },
    []
  );

  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });

  return (
    <Box sx={{ height: 450, width: "90%", marginX: "auto", marginTop: 5 }}>
      {getStatus === REQUEST_STATUS.loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress sx={{ marginTop: 4, marginX: "auto" }} />
        </Box>
      ) : (
        <>
          <StyledDataGrid
            columns={columns}
            rows={news}
            processRowUpdate={processRowUpdate}
            slots={{ noRowsOverlay: EmptyTable }}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              ...data.initialState,
              pagination: { paginationModel: { pageSize: 25 } },
            }}
            componentsProps={{
              pagination: {
                labelRowsPerPage: "Записей на странице",
              },
            }}
            hideFooterSelectedRowCount={true}
          />
          {!!snackbar && (
            <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
          )}
        </>
      )}
    </Box>
  );
};

export { Table };
export type { TableProps };
