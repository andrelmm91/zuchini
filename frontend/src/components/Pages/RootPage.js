import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

import NavBarSideBar from "../NavBar/NavBarSideBar";
// import NavBar2 from "../NavBar/NavBar2";

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit(); // send a logout request
  const userpath = window.location.pathname.toString();

  useEffect(() => {
    if (!token) {
      return;
    }

    const tokenDuration = getTokenDuration();
    setTimeout(() => {
      submit(null, { action: "auth/logout", method: "post" });
    }, tokenDuration); // in milisec
  }, [token, submit, userpath]);

  return (
    <NavBarSideBar>
      <Outlet />
    </NavBarSideBar>
  );
}

export default RootLayout;
