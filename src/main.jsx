import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";
import { theme } from "./Pages/Theme/theme.js";
import ChatProvider from "./Pages/ChatProvider/ChatProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChatProvider>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </ChatProvider>
);
