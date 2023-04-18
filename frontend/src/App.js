// packages
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// routing pages
import Explore from "./components/Pages/Explore";
import ErrorPage from "./components/Pages/ErrorPage";
import AuthSignupPage from "./components/Pages/auth/AuthSignupPage";
import EventPage from "./components/Pages/EventPage";
import NewEvent from "./components/Pages/NewEvent";
import DashboardEventPage from "./components/Pages/DashboardEventPage";
import EditEventPage from "./components/Pages/EditEventPage";
import AuthLoginPage from "./components/Pages/auth/AuthLoginPage";
import LogoutPage from "./components/Pages/auth/LogoutPage";

//rootLayouts
import RootLayoutAuth from "./components/Pages/auth/RootLayoutAuth";
import RootLayout from "./components/Pages/RootPage";

//loaders
import { loader as eventLoader } from "./components/async/loaders/eventLoader";
import { loader as eventIdLoader } from "./components/async/loaders/eventIdlLoader";
import { tokenLoader } from "./components/util/auth";

//actions
import signupAction from "./components/async/action/signupAction";
import loginAction from "./components/async/action/loginAction";
import { action as eventAction } from "./components/async/action/createAction";
import { logoutAction } from "./components/async/action/logoutAction";

// // // routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      { index: true, element: <Explore />, loader: eventLoader },

      {
        path: "explore",
        element: <Explore />,
        loader: eventLoader,
      },
      {
        path: "events",
        children: [
          {
            index: true,
            element: <EventPage />,
            loader: eventLoader,
          },
          {
            path: ":eventId",
            id: "eventId",
            loader: eventIdLoader,
            children: [
              {
                index: true,
                element: <EditEventPage />,
                action: eventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEvent />,
            action: eventAction,
          },
        ],
      },
      {
        path: "dashboardEvents",
        element: <DashboardEventPage />,
        loader: eventLoader,
      },
    ],
  },
  {
    path: "auth",
    element: <RootLayoutAuth />,
    children: [
      {
        index: true,
        path: "login",
        element: <AuthLoginPage />,
        action: loginAction,
      },
      {
        index: true,
        path: "signup",
        element: <AuthSignupPage />,
        action: signupAction,
      },
      {
        index: true,
        path: "logout",
        element: <LogoutPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
