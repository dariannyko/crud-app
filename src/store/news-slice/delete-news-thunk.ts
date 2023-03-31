
import { createAsyncThunk } from "@reduxjs/toolkit";
import { query, REQUESt_METHOD, REQUESt_URL } from "../../shared/api";
import { sendRequest } from "../../utils/send-request";
import { DeleteNewsType } from "./news-slice-types";
import { deleteCurrentNews } from "./news-slice";

export const deleteNews = createAsyncThunk(
    "news/deleteNews",
    async function (
      { id, token }: DeleteNewsType,
      { rejectWithValue, dispatch }
    ) {
      try {
        const result = await sendRequest(
          `${query}${REQUESt_URL.delete}${id}`,
          REQUESt_METHOD.post,
          token,
          undefined
        );
  
        dispatch(deleteCurrentNews(id));
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    }
  );