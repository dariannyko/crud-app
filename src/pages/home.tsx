import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddRow } from "../components/add-row/add-row";
import { Header } from "../components/header";
import { getNews } from "../store/news-slice/get-news-thunk";
import { Table } from "../components/table/table";
import { RootState, useAppDispatch } from "../store/store";

const Home = () => {
  const [open, setOpen] = useState(false);
  const userToken = useSelector((state: RootState) => state.authSlice.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNews(userToken));
  }, []);

  return (
    <>
      <Header setOpen={setOpen} />
      <AddRow open={open} setOpen={setOpen} />
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Данные
      </Typography>
      <Table userToken={userToken} />
    </>
  );
};

export { Home };
