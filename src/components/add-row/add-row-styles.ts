import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledBox = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
    "& > .MuiTextField-root": { maxWidth: "200px", marginBottom: 20 },
    "& > .MuiTextField-root:nth-of-type(odd)": { marginRight: 15 },
  }));

 
