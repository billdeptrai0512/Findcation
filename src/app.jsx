import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./auth/authcontext";
import { UserLocationProvider } from "./map/userLocationContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Analytics } from '@vercel/analytics/react';

import Register from "./auth/register";
import ErrorPage from "./error-page";
import Login from "./auth/login";
import Forgot from "./auth/forgot";
import ResetPassword from "./auth/resetPassword";
import Auth from "./auth/main";
import MainLayout from "./layout";
import Suggestion from "./listing/suggestion";
import Title from "./listing/title";
import TypeOfHouse from "./listing/house_type";
import ImageUpload from "./listing/image/main";
import Features from "./listing/features/features";
import LocationListing from "./listing/location/main";
import RangePrice from "./listing/contacts-prices/price";
import StartPage from "./listing/start";
import Listing from "./listing/main";
import Final from "./listing/final/main";
import { ListingProvider } from "./listing/listingContext";
import { StaycationProvider } from "./map/staycationContext";
import LandingPage from "./map/main";
import ContactsPrices from "./listing/contacts-prices/main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
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
    ], //seperate auth routes
  },
  {
    path: "/list-staycation",
    element: <Listing />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <StartPage /> },
      { path: "title", element: <Title /> },
      { path: "type-of-house", element: <TypeOfHouse /> },
      { path: "images", element: <ImageUpload /> },
      { path: "features", element: <Features /> },
      { path: "location", element: <LocationListing /> },
      { path: "price", element: <ContactsPrices /> },
      { path: "contact",  element: <Final /> },
    ]
  },
  
]);

export default function App() {
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
        <AuthProvider>
          <UserLocationProvider>
            <StaycationProvider>
              <ListingProvider>
                <RouterProvider router={router} />
                <Analytics />
              </ListingProvider>   
            </StaycationProvider>
          </UserLocationProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
  );
}