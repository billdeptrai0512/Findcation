import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./auth/authcontext";
import { LocationProvider } from "./map/layoutContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

import Register from "./auth/register";
import ErrorPage from "./error-page";
import Login from "./auth/login";
import Forgot from "./auth/forgot";
import ResetPassword from "./auth/resetPassword";
import Auth from "./auth/main";
import Listing from "./listing/main";
import Map from "./map/main";
import MainLayout from "./layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <></>, //render nothing for now 
      },
      {
        path: "/auth",
        element: <Auth />,
        children: [
          { path: "login",element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "forgot-password", element: <Forgot /> },
          { path: "reset-password", element: <ResetPassword /> },
        ]
      },
    ],
  },
  {
    path: "/list-staycation",
    element: <Listing />,
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