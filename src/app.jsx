import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./auth/authContext";
import { UserLocationProvider } from "./map/userLocationContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Analytics } from '@vercel/analytics/react';
import { ListingProvider } from "./listing/listingContext";
import { StaycationProvider } from "./map/staycationContext";
import ErrorBoundary from "./components/ErrorBoundary";

import Register from "./auth/register";
import ErrorPage from "./error-page";
import SubmitEmail from "./auth/submitEmail";
import Forgot from "./auth/forgot";
import ResetPassword from "./auth/resetPassword";
import ChangePassword from "./host/options/changePasswords";
import Auth from "./auth/main";
import MainLayout from "./layout";
import Title from "./listing/title";
import TypeOfHouse from "./listing/house_type";
import ImageUpload from "./listing/image/main";
import Features from "./listing/features/features";
import LocationListing from "./listing/location/main";
import StartPage from "./listing/start";
import LandingPage from "./map/main";
import Prices from "./listing/prices/main";
import PreviewStaycation from "./map/preview/main";
import AdminDashBoard from "./admin/main";
import HostDashBoard from "./host/main";
import Staycations from "./host/staycations";
import Staycation from "./host/staycation";
import EditorPage from "./host/editor/main";
import EditorTitle from "./host/editor/title";
import EditorHouseType from "./host/editor/house_type";
import EditorPrices from "./host/editor/prices";
import EditorFeatures from "./host/editor/features";
import EditorLocation from "./host/editor/location";
import EditorImages from "./host/editor/images/main";

import AdminRoute from "./admin/adminRoute";
import HostRoute from "./host/hostRoute";


const Listing = React.lazy(() => import("./listing/main"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "staycation/:id", element: <PreviewStaycation /> },
      {
        path: "/auth",
        element: <Auth />,
        children: [
          { path: "login", element: <SubmitEmail /> },
          { path: "register", element: <Register /> },
          { path: "forgot-password", element: <Forgot /> },
          { path: "reset-password", element: <ResetPassword /> },

        ]
      },
    ],
  },
  {
    path: "/list-staycation",
    element:
      <ListingProvider>
        <Listing />
      </ListingProvider>,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <StartPage /> },
      { path: "title", element: <Title /> },
      { path: "type-of-house", element: <TypeOfHouse /> },
      { path: "images", element: <ImageUpload /> },
      { path: "features", element: <Features /> },
      { path: "location", element: <LocationListing /> },
      { path: "price", element: <Prices /> },
      // { path: "contacts", element: <Contacts /> },
    ]
  },
  { // auth here too, prevent user that's not admin to access admin page
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminDashBoard />
      </AdminRoute>
    ),
    errorElement: <ErrorPage />,
  },
  { //need Auth to check - this :hostId can't check other hostId
    path: "/host/:hostId",
    element: (
      <HostRoute>
        <HostDashBoard />
      </HostRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Staycations /> },
      {
        path: "editor/:staycationId",
        element: <EditorPage />, // <-- this is the wrapper
        children: [
          { index: true, element: <Staycation /> },
          { path: "title", element: <EditorTitle /> },
          { path: "type", element: <EditorHouseType /> },
          { path: "prices", element: <EditorPrices /> },
          { path: "features", element: <EditorFeatures /> },
          { path: "location", element: <EditorLocation /> },
          { path: "images", element: <EditorImages /> },
          // { path: "rooms", element: <EditorRooms /> },
          // { path: "rooms/cover-images", element: <EditorCoverImages /> },
          // { path: "rooms/:roomId", element: <EditorRoomImages /> },
        ]
      },
      { path: "change-password", element: <ChangePassword /> },

    ]
  },

]);

export default function App() {

  // Initialize session ID once on mount
  useEffect(() => {
    if (!localStorage.getItem("traffic_session")) {
      const sessionId = crypto.randomUUID();
      localStorage.setItem("traffic_session", sessionId);
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
      <AuthProvider>
        <UserLocationProvider>
          <StaycationProvider>
            <ErrorBoundary>
              <RouterProvider router={router} />
              <Analytics />
            </ErrorBoundary>
          </StaycationProvider>
        </UserLocationProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}