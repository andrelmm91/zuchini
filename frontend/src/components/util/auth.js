import { redirect } from "react-router-dom";

//////////////// loader for RootPage.js
export const tokenLoader = () => {
  return getAuthToken();
};

// get the token and diliver it to the rootpage.js if exists or no more than 1h
export const getAuthToken = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/auth/login");
  }

  const tokenValid = await tokenVerify(token);
  console.log(tokenValid.validation);

  const tokenDuration = getTokenDuration();
  if (!tokenValid.validation || tokenDuration < 0) {
    return redirect("/auth/logout");
  }

  return token;
};

// get token duration and return the duration
export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
};

async function tokenVerify(token) {
  const data = {
    token: token,
  };
  const response = await fetch("http://localhost:8083/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  if (resData.errors) {
    throw new Error(resData.errors);
  }
  return resData;
}

// //////////////
// export const checkAuthLoader = () => {
//   const token = getAuthToken();

//   if (!token) {
//     return redirect("/auth");
//   }
//   return null;
// };
