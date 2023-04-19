import { json, redirect } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import { AuthActions } from "../../store/authManagementSlice";

export default async function signupAction({ request, params }) {
  // const dispatch = useDispatch();

  const data = await request.formData();

  console.log("email", data.get("email"));
  console.log("password", data.get("password"));
  console.log("username", data.get("username"));

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
    username: data.get("username"),
    dateCreated: new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  };

  const response = await fetch("http://localhost:8082/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);

  // dispatch(
  //   AuthActions.getTokenWhenEnter({
  //     email: data.get("email"),
  //     token: token,
  //   })
  // );

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
