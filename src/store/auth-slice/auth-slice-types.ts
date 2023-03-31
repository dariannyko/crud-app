import { SliceItemType } from "../store-types";

export interface AuthSliceState {
  token: SliceItemType;
  status: SliceItemType;
  error: SliceItemType;
}
