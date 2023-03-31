import { userToken } from "../../shared/const";
import { getLocalItem } from "../../utils/get-local";
import { AuthSliceState } from "./auth-slice-types";

export const initialState: AuthSliceState = {
    token: getLocalItem(userToken) || null,
    status: null,
    error: null,
  };