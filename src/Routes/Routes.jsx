import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import ChatPage from "../Pages/ChatPage/ChatPage";
import Login from "../Pages/Authentication/Login";
import Signup from "../Pages/Authentication/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/chatPage",
    element: <ChatPage />,
  },
]);
