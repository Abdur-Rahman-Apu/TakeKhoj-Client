import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import ChatPage from "../Pages/ChatPage/ChatPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chatPage",
    element: <ChatPage />,
  },
]);
