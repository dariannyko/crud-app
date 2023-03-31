import { sendRequest } from "../../utils/send-request";
import { userToken } from "../../shared/const";
import { User } from "../../shared/types";
import { query, REQUESt_METHOD, REQUESt_URL } from "../../shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAuthToken = createAsyncThunk<string, User>(
  "authentication/getAuthToken",
  async function (user, { rejectWithValue }) {
    try {
      const result = await sendRequest(
        `${query}${REQUESt_URL.login}`,
        REQUESt_METHOD.post,
        null,
        JSON.stringify(user)
      );
      localStorage.setItem(userToken, JSON.stringify(result.data.token));
      return result.data.token;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
