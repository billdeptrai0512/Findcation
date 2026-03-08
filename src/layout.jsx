import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, Suspense } from 'react';
import { useStaycation } from "./map/staycationContext";
import { AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from './components/LoadingSpinner';

import Map from './map/map.jsx';


export default function MainLayout() {
  const location = useLocation();
  const { fetchStaycations } = useStaycation();

  useEffect(() => {
    fetchStaycations();
  }, [fetchStaycations]);

  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingSpinner />} key={location.pathname}>
          <Outlet />
        </Suspense>
      </AnimatePresence>
      <Map />
    </>
  );

}