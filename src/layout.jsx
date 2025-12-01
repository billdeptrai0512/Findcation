import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import React from "react";
const Map = React.lazy(() => import('./map/map.jsx'));

export default function MainLayout() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
      <Map />
    </>
  );

}