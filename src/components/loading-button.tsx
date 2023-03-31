import { SliceItemType } from "../store/store-types";
import { REQUEST_STATUS } from "../shared/api";

import { Box, Button, CircularProgress } from "@mui/material";
import { green } from "@mui/material/colors";

interface LoadingButtonProps {
  buttonName: string;
  status: SliceItemType;
}

const LoadingButton = ({ buttonName, status }: LoadingButtonProps) => {
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Button
        variant="contained"
        sx={{ width: "100%", paddingY: "10px" }}
        disabled={status === REQUEST_STATUS.loading}
        type={"submit"}
      >
        {buttonName}
      </Button>
      {status === REQUEST_STATUS.loading && (
        <CircularProgress
          size={24}
          sx={{
            color: green[500],
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
};

export { LoadingButton };
export type { LoadingButtonProps };
