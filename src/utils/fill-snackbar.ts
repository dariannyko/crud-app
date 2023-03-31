import { AlertColor } from "@mui/material";

export const fillSnackbar = (message: undefined | string,status: AlertColor | undefined) => {
  return { children: message, severity: status };
};
