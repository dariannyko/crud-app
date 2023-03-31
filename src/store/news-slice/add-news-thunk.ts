import { createAsyncThunk } from "@reduxjs/toolkit";
import { query, REQUESt_METHOD, REQUESt_URL } from "../../shared/api";
import { sendRequest } from "../../utils/send-request";
import { AddNewsType } from "./news-slice-types";
import { News } from "../../shared/types";

export const addNews = createAsyncThunk<News, AddNewsType>(
    "news/addNews",
    async function ({ token, body }, { rejectWithValue }) {
      try {
        const jsonBody = JSON.stringify(body);
        const result = await sendRequest(
          `${query}${REQUESt_URL.add}`,
          REQUESt_METHOD.post,
          token,
          jsonBody
        );
        return result.data;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    }
  );