import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import React from "react";

import Explore from "./components/Pages/Explore";
import { loader as eventLoader } from "./components/async/loaders/eventLoader";
import { loader as eventIdLoader } from "./components/async/loaders/eventIdlLoader";
import ErrorPage from "./components/Pages/ErrorPage";
import AuthSigninPage from "./components/Pages/auth/AuthSignupPage";
import RootLayout from "./components/Pages/RootPage";
import { action as eventAction } from "./components/async/action/createAction";
import EventPage from "./components/Pages/EventPage";
import NewEvent from "./components/Pages/NewEvent";
import DashboardEventPage from "./components/Pages/DashboardEventPage";
import EditEventPage from "./components/Pages/EditEventPage";
import AuthLoginPage from "./components/Pages/auth/AuthLoginPage";

const routes = createRoutesFromElements(
  <React.Fragment>
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route path="/explore" element={<Explore />} loader={eventLoader} exact />
      <Route
        path="/dashboardEvents"
        element={<DashboardEventPage />}
        loader={eventLoader}
        exact
      />
    </Route>
    <Route path="/events" element={<EventPage />} loader={eventLoader}>
      <Route
        path=":eventId"
        element={<EditEventPage />}
        loader={eventIdLoader}
        action={eventAction}
        exact
      />
      <Route path="new" element={<NewEvent />} action={eventAction} exact />
    </Route>
  </React.Fragment>
);

const router = createBrowserRouter(routes);

function App2() {
  return <RouterProvider router={router} />;
}

export default App2;
