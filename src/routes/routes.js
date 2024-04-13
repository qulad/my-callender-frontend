import { lazy } from "react";
import PathConstants from "./PathConstant";
const Home = lazy(() => import("pages/home"));
const About = lazy(() => import("pages/about"));
const Login = lazy(() => import("pages/auth/login"));
const Register = lazy(() => import("pages/auth/register"));
const User = lazy(() => import("pages/user"));

const routes = [
  { path: PathConstants.HOME, element: <Home /> },
  { path: PathConstants.ABOUT, element: <About /> },
  { path: PathConstants.LOGIN, element: <Login /> },
  { path: PathConstants.REGISTER, element: <Register /> },
  { path: PathConstants.USER, element: <User /> },
];
export default routes;
