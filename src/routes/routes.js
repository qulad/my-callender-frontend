import { useParams, Navigate } from 'react-router-dom';
import { lazy } from "react";
import PathConstants from "./PathConstant";
const Home = lazy(() => import("pages/home"));
const About = lazy(() => import("pages/about"));
const Login = lazy(() => import("pages/auth/login"));
const Logout = lazy(() => import("pages/auth/logout"));
const Register = lazy(() => import("pages/auth/register"));
const User = lazy(() => import("pages/user"));
const Event = lazy(() => import("pages/event"));

const RouteGuard = ({ children }) => {
  const { id } = useParams();
  const uuidRegex = /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/;


  if (!isNaN(id) && !uuidRegex.test(id)) {
    return <Navigate to={PathConstants.HOME} />;
  }

  return children;
};

const routes = [
  { path: PathConstants.HOME, element: <Home /> },
  { path: PathConstants.ABOUT, element: <About /> },
  { path: PathConstants.LOGIN, element: <Login /> },
  { path: PathConstants.LOGOUT, element: <Logout /> },
  { path: PathConstants.REGISTER, element: <Register /> },
  { path: "/user/:id", element: <RouteGuard><User /></RouteGuard> },
  { path: "/event/:id", element: <RouteGuard><Event /></RouteGuard> }
];
export default routes;
