import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

export default function Auth() {

  const location = useLocation();

  return (

    <Outlet  />

  );

}