import { NewsSliceState } from "./news-slice-types";

export const initialState: NewsSliceState = {
    news: [],
    getError: null,
    getStatus: null,
    deleteError: null,
    deleteStatus: null,
    editError: null,
    editStatus: null,
    addError: null,
    addStatus: null,
  };