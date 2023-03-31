import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { addNews } from "../../store/news-slice/add-news-thunk";
import { EmptyFieldWarning } from "../empty-field-warning";
import { SnackBar } from "../snack-bar";
import { LoadingButton } from "../loading-button";
import { REQUEST_STATUS } from "../../shared/api";
import { initialValue } from "../../shared/const";
import { MuiDateTimeParams } from "../../shared/types";
import { getRow } from "../../utils/get-row";
import { fillSnackbar } from "../../utils/fill-snackbar";
import { checkEmptyRow } from "../../utils/check-empty-row";
import { StyledBox } from "./add-row-styles";

import {
  AlertProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

interface AddRowProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const AddRow = ({ open, setOpen }: AddRowProps) => {
  const [user, setUser] = useState(initialValue);
  const [isEmptyRow, setIsEmptyRow] = useState(false);
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);
  const { addStatus } = useSelector((state: RootState) => state.newsSlice);
  const userToken = useSelector((state: RootState) => state.authSlice.token);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (addStatus === REQUEST_STATUS.resolved) {
      setOpen(false);
    }
    if (addStatus === REQUEST_STATUS.rejected) {
      setSnackbar(fillSnackbar("Ошибка сервера", "error"));
    }
  }, [addStatus]);

  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEmptyRow(false);
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onDateChange = (value: MuiDateTimeParams | null, key: string) => {
    setIsEmptyRow(false);
    if (value) {
      setUser({ ...user, [key]: value.$d });
    }
  };

  const addNewField = (event: FormEvent) => {
    event.preventDefault();
    const isEmpty = checkEmptyRow(user);
    if (isEmpty) {
      setIsEmptyRow(true);
      return;
    }
    const newRow = getRow(user, user.companySigDate, user.employeeSigDate);
    dispatch(addNews({ token: userToken, body: newRow }));
  };

  const handleClose = () => {
    setIsEmptyRow(false);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ maxWidth: "550px", marginX: "auto" }}
    >
      <DialogTitle sx={{ paddingY: 3, paddingX: 4 }}>
        Добавить новую запись
      </DialogTitle>
      <form onSubmit={addNewField}>
        <DialogContent
          sx={{
            "& > .MuiTextField-root": { maxWidth: "200px" },
            "& > .MuiStack-root": {
              overflow: "hidden",
              padding: 0,
              marginBottom: "20px",
            },
            paddingX: 4,
            paddingBottom: 0,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                label="Подписано компанией"
                onChange={(newValue: MuiDateTimeParams | null) =>
                  onDateChange(newValue, "companySigDate")
                }
              />
            </DemoContainer>
          </LocalizationProvider>
          <StyledBox>
            <TextField
              id="company-signature-name"
              label="Документ"
              name="companySignatureName"
              onChange={onValueChange}
            />
            <TextField
              id="document-name"
              label="Название"
              name="documentName"
              onChange={onValueChange}
            />
          </StyledBox>
          <StyledBox>
            <TextField
              id="document-status"
              label="Статус"
              name="documentStatus"
              onChange={onValueChange}
            />
            <TextField
              id="document-type"
              label="Тип документа"
              name="documentType"
              onChange={onValueChange}
            />
          </StyledBox>
          <StyledBox>
            <TextField
              id="employee-number"
              label="Номер сотрудника"
              name="employeeNumber"
              onChange={onValueChange}
            />
            <TextField
              id="employee-signature-name"
              label="Документ"
              name="employeeSignatureName"
              onChange={onValueChange}
            />
          </StyledBox>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                label="Подписано сотрудником"
                onChange={(newValue: MuiDateTimeParams | null) =>
                  onDateChange(newValue, "employeeSigDate")
                }
              />
            </DemoContainer>
          </LocalizationProvider>
          {isEmptyRow && <EmptyFieldWarning children={"Заполните все поля!"} />}
        </DialogContent>
        <DialogActions
          sx={{
            paddingBottom: 3,
            paddingX: 4,
            display: "flex",
            justifyContent: "space-between",
            columnGap: 1.5,
          }}
        >
          <LoadingButton buttonName={"Добавить"} status={addStatus} />
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ width: "100%", paddingY: "10px" }}
          >
            Отмена
          </Button>
        </DialogActions>
      </form>
      {!!snackbar && <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />}
    </Dialog>
  );
};
export { AddRow };
export type { AddRowProps };
