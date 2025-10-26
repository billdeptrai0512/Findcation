import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./auth/authContext";
import { UserLocationProvider } from "./map/userLocationContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Analytics } from '@vercel/analytics/react';
import { ListingProvider } from "./listing/listingContext";
import { StaycationProvider } from "./map/staycationContext";

import Register from "./auth/register";
import ErrorPage from "./error-page";
import SubmitEmail from "./auth/submitEmail";
import Forgot from "./auth/forgot";
import ResetPassword from "./auth/resetPassword";
import Auth from "./auth/main";
import MainLayout from "./layout";
import Title from "./listing/title";
import TypeOfHouse from "./listing/house_type";
import ImageUpload from "./listing/image/main";
import Features from "./listing/features/features";
import LocationListing from "./listing/location/main";
import StartPage from "./listing/start";
import Listing from "./listing/main";
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
import EditorRooms from "./host/editor/rooms";
import EditorRoomImages from "./host/editor/images/room";

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
          { path: "login",element: <SubmitEmail /> },
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
  {
    path: "/admin",
    element: <AdminDashBoard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/host/:hostId",
    element: <HostDashBoard />,
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
          // { path: "rooms", element: <EditorRooms /> },
          // { path: "rooms/cover-images", element: <EditorCoverImages /> },
          // { path: "rooms/:roomId", element: <EditorRoomImages /> },
          { path: "images", element: <EditorImages /> },
        ]
      }
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