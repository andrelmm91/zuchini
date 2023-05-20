import { Outlet, redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// import NavBar2 from "../NavBar/NavBar2";
import { useDispatch, useSelector } from "react-redux";
import { cleanToken, tokenVerify } from "../store/auth-actions";
import NavBar from "../NavBar/NavBar";

function RootLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userpath = window.location.pathname.toString();
  const tokenDuration = getTokenDuration();

  if (!token || tokenDuration < 0) {
    navigate("/auth/logout");
  }

  useEffect(() => {
    dispatch(tokenVerify(token));
  }, [dispatch, token, userpath]);

  const userValidated = useSelector((state) => state.authToken.validation);

  if (userValidated === false) {
    dispatch(cleanToken());
    navigate("/auth/logout");
  }

  useEffect(() => {
    setTimeout(() => {
      navigate("/auth/logout");
    }, tokenDuration); // in milisec
  }, [token, userpath]);

  return (
    <NavBar>
      <Outlet />
    </NavBar>
  );
}

export default RootLayout;

const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
};
