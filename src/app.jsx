import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { AuthProvider } from "./auth/authcontext";
import { LocationProvider } from "./layout/layoutContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

import Register from "./auth/register";
import ErrorPage from "./error-page";
import Login from "./auth/login";
import Forgot from "./auth/forgot";
import ResetPassword from "./auth/resetPassword";
import MapLayout from "./layout/main";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MapLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: null,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <Forgot />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />
      }
    ],
  },
]);

export default function App() {
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
        <AuthProvider>
          <LocationProvider>
            <RouterProvider router={router} />
          </LocationProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
  );
}