import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "./theme";
import "@fontsource/lato";
import { Web3Context, Web3ContextProvider } from "./utils/Web3Context";
import { AppContext, AppContextProvider } from "./utils/AppContext";

ReactDOM.render(
  <React.StrictMode>
    <Web3ContextProvider>
      <AppContextProvider>
        <ChakraProvider theme={theme}>
          <Box backgroundColor="whiteAlpha">
            <App />
          </Box>
        </ChakraProvider>
      </AppContextProvider>
    </Web3ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
