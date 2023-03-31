import { useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteNews } from "../store/news-slice/delete-news-thunk";
import { RootState, useAppDispatch } from "../store/store";
import { fillSnackbar } from "../utils/fill-snackbar";

import { AlertProps, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridRenderCellParams } from "@mui/x-data-grid";

interface DeleteRowProps {
  params: GridRenderCellParams;
  userToken: string | null;
  setSnackbar: (value: AlertProps | null) => void;
}

const DeleteRow = ({ params, userToken, setSnackbar }: DeleteRowProps) => {
  const { deleteError } = useSelector((state: RootState) => state.newsSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (deleteError) {
      setSnackbar(fillSnackbar("Ошибка удаления", "error"));
    }
    if (deleteError) {
    }
  }, [deleteError]);

  const handleClick = () => {
    dispatch(deleteNews({ id: params.row.id, token: userToken }));
  };

  return (
    <Box sx={{ m: 1, position: "relative" }}>
      <IconButton aria-label="delete" color="primary" onClick={handleClick}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};
export { DeleteRow };
export type { DeleteRowProps };
