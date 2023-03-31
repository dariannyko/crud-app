import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { REQUEST_STATUS } from "../../shared/api";
import { News } from "../../shared/types";
import { addNews } from "./add-news-thunk";
import { deleteNews } from "./delete-news-thunk";
import { editNews } from "./edit-news-thunk";
import { getNews } from "./get-news-thunk";
import { initialState } from "./news-slice-const";

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    deleteCurrentNews(state, action: PayloadAction<string>) {
      state.news = state.news.filter((item) => item.id !== action.payload);
    },
    editCurrentNews(state, action: PayloadAction<News>) {
      state.news = state.news.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNews.pending, (state, action: AnyAction) => {
      state.getStatus = REQUEST_STATUS.loading;
      state.getError = action.payload;
    });
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.getStatus = REQUEST_STATUS.resolved;
      state.news = action.payload;
      state.getError = null;
    });
    builder.addCase(getNews.rejected, (state, action: AnyAction) => {
      state.getStatus = REQUEST_STATUS.rejected;
      state.getError = action.payload;
    });

    builder.addCase(deleteNews.pending, (state, action: AnyAction) => {
      state.deleteStatus = REQUEST_STATUS.loading;
      state.deleteError = action.payload;
    });
    builder.addCase(deleteNews.fulfilled, (state) => {
      state.deleteStatus = REQUEST_STATUS.resolved;
      state.deleteError = null;
    });
    builder.addCase(deleteNews.rejected, (state, action: AnyAction) => {
      state.deleteStatus = REQUEST_STATUS.rejected;
      state.deleteError = action.payload;
    });

    builder.addCase(editNews.pending, (state, action: AnyAction) => {
      state.editStatus = REQUEST_STATUS.loading;
      state.editError = action.payload;
    });
    builder.addCase(editNews.fulfilled, (state) => {
      state.editStatus = REQUEST_STATUS.resolved;
      state.editError = null;
    });
    builder.addCase(editNews.rejected, (state, action: AnyAction) => {
      state.editStatus = REQUEST_STATUS.rejected;
      state.editError = action.payload;
    });

    builder.addCase(addNews.pending, (state, action: AnyAction) => {
      state.addStatus = REQUEST_STATUS.loading;
      state.addError = action.payload;
    });
    builder.addCase(addNews.fulfilled, (state, action) => {
      state.addStatus = REQUEST_STATUS.resolved;
      state.news = [...state.news, action.payload];
      state.addError = null;
    });
    builder.addCase(addNews.rejected, (state, action: AnyAction) => {
      state.addStatus = REQUEST_STATUS.rejected;
      state.addError = action.payload;
    });
  },
});
export const { deleteCurrentNews, editCurrentNews } = newsSlice.actions;
export default newsSlice.reducer;
