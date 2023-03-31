import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATUS } from "../../shared/api";
import { initialState } from "./auth-slice-const";
import { getAuthToken } from "./get-auth-token-thunk";

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthToken.pending, (state) => {
      state.status = REQUEST_STATUS.loading;
      state.error = null;
    });
    builder.addCase(getAuthToken.fulfilled, (state, action) => {
      state.status = REQUEST_STATUS.resolved;
      state.token = action.payload;
      state.error = null;
    });
    builder.addCase(getAuthToken.rejected, (state, action: AnyAction) => {
      state.status = REQUEST_STATUS.rejected;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
