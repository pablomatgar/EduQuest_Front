import React from "react";
import { Route as PublicRoute } from "react-router-dom";

const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const VideoPage = React.lazy(() => import("../pages/VideoPage"));
const NewRoomPage = React.lazy(() => import("../pages/NewRoomPage"));

export enum PageVisibilityEnum {
  PUBLIC = "PUBLIC",
  NOT_LOGGED_IN = "NOT_LOGGED_IN",
  LOGGED_IN = "LOGGED_IN",
  TEACHER_ONLY = "TEACHER_ONLY",
}

export interface IRoute {
  exact: boolean;
  path: string;
  component: JSX.Element;
  visibility: PageVisibilityEnum;
  nav: (() => JSX.Element) | null;
  footer: (() => JSX.Element) | null;
}

export const getRouteComponent = (v: PageVisibilityEnum) => {
  switch (v) {
    case PageVisibilityEnum.PUBLIC:
      return PublicRoute;
    case PageVisibilityEnum.LOGGED_IN:
      // TODO: Create a component that's only for logged in users.
      return PublicRoute;
    case PageVisibilityEnum.NOT_LOGGED_IN:
      // TODO: Create a component that's only for not logged in users.
      return PublicRoute;
    case PageVisibilityEnum.TEACHER_ONLY:
      return PublicRoute;
  }
};

export const routes: IRoute[] = [
  {
    path: "/",
    exact: true,
    component: <LoginPage />,
    visibility: PageVisibilityEnum.NOT_LOGGED_IN,
    nav: null,
    footer: null,
  },
  {
    path: "/videoRoom",
    exact: false,
    component: <VideoPage />,
    visibility: PageVisibilityEnum.NOT_LOGGED_IN,
    nav: null,
    footer: null,
  },
  {
    path: "/rooms/new",
    exact: false,
    component: <NewRoomPage />,
    visibility: PageVisibilityEnum.TEACHER_ONLY,
    nav: null,
    footer: null,
  },
];
