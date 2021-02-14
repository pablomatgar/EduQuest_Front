import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { RouteSwitchWithNav } from "./components/RouteSwitchWithNav";
import { routes } from "./routes";
import { AuthProvider } from "./Utils/Auth";
import { Socket } from "react-socket-io";
import { UserProvider } from "./lib/context/UserProfileContext";

const queryClient = new QueryClient();

const uri = process.env.REACT_APP_SERVER_URL;
const options = { transports: ["websocket"], withCredentials: true };

export const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AuthProvider>
          <ChakraProvider theme={theme}>
            <Socket uri={uri} options={options}>
              <React.Suspense fallback={null}>
                <RouteSwitchWithNav routes={routes} basePath="" />
              </React.Suspense>
            </Socket>
          </ChakraProvider>
        </AuthProvider>
      </UserProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
