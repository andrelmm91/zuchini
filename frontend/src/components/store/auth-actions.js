import { AuthActions } from "./authManagementSlice";

export const tokenVerify = (token) => {
  return async (dispatch) => {
    console.log("tokenVerify token");

    const checkToken = async () => {
      const response = await fetch("http://localhost:8083/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });

      if (!response.ok) {
        throw new Error("Could not validate data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const data = await checkToken();
      console.log("tokenVerify validation", data);

      dispatch(
        AuthActions.validateToken({
          validation: data.validation,
        })
      );
    } catch (error) {
      dispatch(
        AuthActions.validateToken({
          validation: false,
        })
      );
    }
  };
};

export const cleanToken = () => {
  return (dispatch) => {
    console.log("cleanToken accessed");
    dispatch(AuthActions.cleanUpToken());
  };
};
