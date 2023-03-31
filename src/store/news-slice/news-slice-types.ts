import { News } from "../../shared/types";
import { SliceItemType } from "../store-types";

export interface NewsSliceState {
  news: News[];
  getError: SliceItemType;
  getStatus: SliceItemType;
  deleteError: SliceItemType;
  deleteStatus: SliceItemType;
  editError: SliceItemType;
  editStatus: SliceItemType;
  addError: SliceItemType;
  addStatus: SliceItemType;
}

export interface DeleteNewsType {
  id: string;
  token: SliceItemType;
}

export interface EditNewsType {
  id: string;
  token: SliceItemType;
  body: News;
}

export interface AddNewsType {
  token: SliceItemType;
  body: News;
}
