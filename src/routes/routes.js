import { useParams, Navigate } from 'react-router-dom';
import { lazy } from "react";
import PathConstants from "./PathConstant";
const Home = lazy(() => import("pages/home"));
const About = lazy(() => import("pages/about"));
const Login = lazy(() => import("pages/auth/login"));
const Logout = lazy(() => import("pages/auth/logout"));
const Register = lazy(() => import("pages/auth/register"));
const User = lazy(() => import("pages/user"));

const RouteGuard = ({ children }) => {
  const { id } = useParams();

  if (!isNaN(id)) {
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
];
export default routes;
