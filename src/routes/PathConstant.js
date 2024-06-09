const PathConstants = {
  HOME: "/",
  LOGIN: "/login",
  LOGOUT: "/logout",
  REGISTER: "/register",
  ABOUT: "/about",
  USER: "/user/",
  ADD_EVENT: "/add-event",
  EVENT: "/event/",
  BACKEND: {
    FRIENDS: "http://localhost:5000/user/friends",
    BASE: "http://localhost:5000",
    LOGIN: "http://localhost:5000/auth/login",
    REGISTER: "http://localhost:5000/auth/register",
    EVENT: "http://localhost:5000/event",
    ME: "http://localhost:5000/user/me",
    USER: "http://localhost:5000/user/"
  }
};

export default PathConstants;
