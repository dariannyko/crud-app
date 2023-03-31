import { Alert, AlertProps, Snackbar } from "@mui/material";

interface SnackBarProps {
  snackbar: AlertProps;
  setSnackbar: (value: AlertProps | null) => void;
}

const SnackBar = ({ snackbar, setSnackbar }: SnackBarProps) => {
  const handleCloseSnackbar = () => setSnackbar(null);

  return (
    <Snackbar
      open
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={handleCloseSnackbar}
      autoHideDuration={6000}
    >
      <Alert {...snackbar} onClose={handleCloseSnackbar} />
    </Snackbar>
  );
};

export { SnackBar };
export type { SnackBarProps };
