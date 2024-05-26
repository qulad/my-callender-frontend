const PathConstants = {
  HOME: "/",
  LOGIN: "/login",
  LOGOUT: "/logout",
  REGISTER: "/register",
  ABOUT: "/about",
  USER: "/user/:id",
  BACKEND: {
    LOGIN: "http://localhost:5000/auth/login",
    REGISTER: "http://localhost:5000/auth/register",
  }
};

export default PathConstants;
