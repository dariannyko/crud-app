import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAuthToken } from "../store/auth-slice/get-auth-token-thunk";
import { RootState, useAppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "../components/loading-button";
import { SnackBar } from "../components/snack-bar";
import { fillSnackbar } from "../utils/fill-snackbar";

import { AlertProps, Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";

const LoginPage = () => {
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loginWarning, setLoginWarning] = useState<boolean>(false);
  const [passwordWarning, setPasswordWarning] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);
  const { token, error, status } = useSelector(
    (state: RootState) => state.authSlice
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (error) {
      setSnackbar(fillSnackbar("Ошибка авторизации", "error"));
    }
  }, [error]);

  const handleChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
    setLoginWarning(false);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordWarning(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!login?.trim()) {
      setLoginWarning(true);
      return;
    }
    if (!password?.trim()) {
      setPasswordWarning(true);
      return;
    }
    dispatch(getAuthToken({ username: login, password }));
  };

  return (
    <Box
      sx={{
        backgroundColor: grey[200],
        width: "100%",
        height: "100vh",
        paddingTop: 10,
      }}
    >
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          width: "30%",
          maxWidth: "400px",
          minWidth: "300px",
          padding: 3,
          paddingBottom: 4,
          marginX: "auto",
          backgroundColor: "#FFF",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" component="p" sx={{ marginBottom: 4 }}>
          Войти
        </Typography>
        <TextField
          id="login"
          label="Логин"
          onChange={handleChangeLogin}
          name="userName"
          error={loginWarning}
          helperText={loginWarning ? "Введите логин" : null}
          sx={{ width: "100%", marginBottom: 3 }}
        />
        <TextField
          id="password"
          label="Пароль"
          onChange={handleChangePassword}
          name="userPassword"
          error={passwordWarning}
          helperText={passwordWarning ? "Введите пароль" : null}
          sx={{ width: "100%", marginBottom: 5 }}
        />
        <LoadingButton buttonName={"Войти"} status={status} />
      </Box>
      {!!snackbar && <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />}
    </Box>
  );
};

export { LoginPage };
