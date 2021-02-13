import * as React from "react";
import { ChakraProvider, theme} from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { RouteSwitchWithNav } from "./components/RouteSwitchWithNav";
import { routes } from "./routes";
import LoginPage from './pages/LoginPage/index';

export const App = () => (
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <React.Suspense fallback={null}>
        <RouteSwitchWithNav routes={routes} basePath="" />
        <LoginPage />
      </React.Suspense>
    </ChakraProvider>
  </BrowserRouter>
);


