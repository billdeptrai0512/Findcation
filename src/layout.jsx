import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Map from './map/map';

export default function MainLayout() {

  return (
    <>
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
        <Map />
    </>    
  );

}