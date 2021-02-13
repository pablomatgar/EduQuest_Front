import React, { Suspense } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { LoadingPage } from "../LoadingPage";
import { IRoute, getRouteComponent } from "../../routes";

interface IProps {
  routes: IRoute[];
  basePath: string;
}

export function RouteSwitchWithNav({ routes, basePath }: IProps) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Switch>
        {routes.map((route) => {
          if (!route.nav) {
            return null;
          }
          return (
            <Suspense key={route.path} fallback={null}>
              <Route path={`${basePath}${route.path}`}>{route.nav()}</Route>
            </Suspense>
          );
        })}
      </Switch>
      <Switch>
        {routes.map((route) => {
          const RouteComponent = getRouteComponent(route.visibility);
          return (
            <RouteComponent
              key={route.path}
              exact={route.exact}
              path={`${basePath}${route.path}`}
            >
              {route.component}
            </RouteComponent>
          );
        })}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      <Switch>
        {routes.map((route) => {
          if (!route.footer) {
            return null;
          }
          return (
            <Route key={route.path} path={`${basePath}${route.path}`}>
              {route.footer()}
            </Route>
          );
        })}
      </Switch>
    </Suspense>
  );
}
