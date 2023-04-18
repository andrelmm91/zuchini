import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { ChakraProvider, theme } from "@chakra-ui/react";
import store from "./components/store";
import { Provider } from "react-redux";
// import App2 from "./App2";

const root = createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);
