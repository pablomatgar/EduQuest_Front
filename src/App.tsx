import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { RouteSwitchWithNav } from "./components/RouteSwitchWithNav";
import { SocketConnectionProvider } from "./lib/context/SocketConnectionContext";
import { routes } from "./routes";

export const App = () => (
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <SocketConnectionProvider>
        <React.Suspense fallback={null}>
          <RouteSwitchWithNav routes={routes} basePath="" />
        </React.Suspense>
      </SocketConnectionProvider>
    </ChakraProvider>
  </BrowserRouter>
);
