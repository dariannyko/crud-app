import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";

interface RequireAuthProps  {
  children: JSX.Element;
};

const RequireAuth = ({ children }:RequireAuthProps) => {
  const userToken = useSelector((state: RootState) => state.authSlice.token);

  if (!userToken) {
    return <Navigate to="./login" />;
  }

  return children;
};

export { RequireAuth };
export type {RequireAuthProps}
