import { createAsyncThunk } from "@reduxjs/toolkit";
import { query, REQUESt_METHOD, REQUESt_URL } from "../../shared/api";
import { News } from "../../shared/types";
import { SliceItemType } from "../store-types";
import { sendRequest } from "../../utils/send-request";

export const getNews = createAsyncThunk<News[], SliceItemType>(
  "news/getNews",
  async function (token, { rejectWithValue }) {
    try {
      const result = await sendRequest(
        `${query}${REQUESt_URL.get}`,
        REQUESt_METHOD.get,
        token,
        undefined
      );

      return result.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
