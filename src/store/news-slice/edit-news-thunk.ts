import { createAsyncThunk } from "@reduxjs/toolkit";
import { query, REQUESt_METHOD, REQUESt_URL } from "../../shared/api";
import { sendRequest } from "../../utils/send-request";
import { EditNewsType } from "./news-slice-types";
import { editCurrentNews } from "./news-slice";

export const editNews = createAsyncThunk(
  "news/editNews",
  async function (
    { id, token, body }: EditNewsType,
    { rejectWithValue, dispatch }
  ) {
    try {
      const jsonBody = JSON.stringify(body);
      const result = await sendRequest(
        `${query}${REQUESt_URL.set}${id}`,
        REQUESt_METHOD.post,
        token,
        jsonBody
      );
      dispatch(editCurrentNews(body));
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
