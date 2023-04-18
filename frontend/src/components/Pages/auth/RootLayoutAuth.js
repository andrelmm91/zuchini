import { Outlet, redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react"; // added useEffect to use redirect function correctly
import { Box } from "@chakra-ui/react";
import colorPalettes from "../../colorSettings/colorPalettes";

const color = colorPalettes();

function RootLayoutAuth() {
  const navigate = useNavigate();
  const userpath = window.location.pathname.toString();

  useEffect(() => {
    // added useEffect to wait for component to render before redirect
    if (userpath === "/auth") {
      console.log("auth");
      navigate("../auth/login");
    }
  }, [userpath]);

  return (
    <Box minH="100vh" w="100vw" bg={color.background}>
      <Outlet />
    </Box>
  );
}

export default RootLayoutAuth;
