import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ui/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/authentication",
    element: <Authentication />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
    ],
  },
  {
    path: "*",
    element: <SignIn />, // fallback to signin
  },
]);
