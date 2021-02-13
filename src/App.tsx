import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { RouteSwitchWithNav } from "./components/RouteSwitchWithNav";
import { SocketConnectionProvider } from "./lib/context/SocketConnectionContext";
import { routes } from "./routes";

const queryClient = new QueryClient();

export const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SocketConnectionProvider>
          <React.Suspense fallback={null}>
            <RouteSwitchWithNav routes={routes} basePath="" />
          </React.Suspense>
        </SocketConnectionProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
