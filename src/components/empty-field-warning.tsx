import { Typography } from "@mui/material";
import { red } from "@mui/material/colors";

interface EmptyFieldWarningProps {
  children: string;
}

const EmptyFieldWarning = ({ children }: EmptyFieldWarningProps) => {
  return (
    <Typography variant="body1" component="p" sx={{ color: red[500] }}>
      {children}
    </Typography>
  );
};

export { EmptyFieldWarning };
export type { EmptyFieldWarningProps };
