import React from "react";
import Header from "./Header";
import { Outlet, useNavigation } from "react-router-dom";
import Footer from "./Footer";
import AnimeLoading from "./AnimeLoading";

const AppLayout = () => {
  const navigation = useNavigation();

  if (navigation.status === "loading") return <AnimeLoading />;

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
