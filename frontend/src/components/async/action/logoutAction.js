// import { useSelector, useDispatch } from "react-redux";
import { AuthActions } from "../../store/authManagementSlice";

export const logoutAction = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");

  return null;
};
