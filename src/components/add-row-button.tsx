import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddRowButtonProps {
  setOpen: (value: boolean) => void;
}

const AddRowButton = ({ setOpen }: AddRowButtonProps) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
      onClick={handleClickOpen}
    >
      <AddIcon />
    </IconButton>
  );
};

export { AddRowButton };
export type {AddRowButtonProps};
