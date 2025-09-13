// AnimatedOutlet.jsx
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

export default function AnimatedOutlet() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        style={{ height: "100%" }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
