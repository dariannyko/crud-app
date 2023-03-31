import styled from "@emotion/styled";
import { DataGrid } from "@mui/x-data-grid";

export const StyledDataGrid = styled(DataGrid)(() => ({
    border: 0,
    color: "rgba(0,0,0,.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    WebkitFontSmoothing: "auto",
    letterSpacing: "normal",
    "& .MuiDataGrid-columnsContainer": {
      backgroundColor: "#fafafa",
    },
  
    "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
      borderRight: `1px solid ${"#f0f0f0"}`,
    },
    "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
      borderBottom: `1px solid ${"#f0f0f0"}`,
    },
    "& .MuiDataGrid-cell": {
      color: "rgba(0,0,0,.85)",
    },
    "& .MuiDataGrid-cell:first-of-type": {
      borderLeft: `1px solid ${"#f0f0f0"}`,
    },
  }));