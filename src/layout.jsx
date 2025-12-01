import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useStaycation } from "./map/staycationContext";
import { AnimatePresence } from 'framer-motion';
import Map from './map/map.jsx';

export default function MainLayout() {
  const location = useLocation();
  const { fetchStaycations } = useStaycation();

  useEffect(() => {
    fetchStaycations();
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
      <Map />
    </>
  );

}