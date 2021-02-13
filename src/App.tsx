import * as React from "react";
<<<<<<< HEAD
import { ChakraProvider, theme} from "@chakra-ui/react";
=======
import { ChakraProvider, theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
>>>>>>> ab07d9a3162adbd95f9f82a1e9c557ad89dafecf
import { BrowserRouter } from "react-router-dom";
import { RouteSwitchWithNav } from "./components/RouteSwitchWithNav";
import { SocketConnectionProvider } from "./lib/context/SocketConnectionContext";
import { routes } from "./routes";
import LoginPage from './pages/LoginPage/index';

const queryClient = new QueryClient();

export const App = () => (
  <BrowserRouter>
<<<<<<< HEAD
    <ChakraProvider theme={theme}>
      <React.Suspense fallback={null}>
        <RouteSwitchWithNav routes={routes} basePath="" />
        <LoginPage />
      </React.Suspense>
    </ChakraProvider>
=======
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SocketConnectionProvider>
          <React.Suspense fallback={null}>
            <RouteSwitchWithNav routes={routes} basePath="" />
          </React.Suspense>
        </SocketConnectionProvider>
      </ChakraProvider>
    </QueryClientProvider>
>>>>>>> ab07d9a3162adbd95f9f82a1e9c557ad89dafecf
  </BrowserRouter>
);


