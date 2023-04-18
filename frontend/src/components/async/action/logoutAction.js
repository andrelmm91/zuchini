export const logoutAction = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");

  return null;
};
