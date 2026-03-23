import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import BasicInfo from "./pages/SignUp/BasicInfo";
import Password from "./pages/SignUp/Password";
import Profile from "./pages/SignUp/Profile";
import SignupLayout from "./layouts/SignupLayout";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ui/ProtectedRoute";

export const router = createBrowserRouter([
  { 
    path: "/signin", 
    element: <SignIn /> 
  },

  { 
    path: "/signup",
    element: <SignupLayout />,
    children: [
      {index: true, element: <BasicInfo />},
      {path: "basic-info", element: <BasicInfo />},
      {path: "password", element: <Password />},
      {path: "profile", element: <Profile />},
    ]
  
  },

  { 
    path: "/authentication", 
    element: <Authentication /> 
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
