import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import styles from "./login.module.css"

export default function Auth() {

  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const exitOverLay = () => {
    if (isMobile) return

    return navigate("/")
  }

  return (
    <AnimatePresence mode="wait">
      <div onClick={exitOverLay} className={styles.preview_overlay} >
          <Outlet key={location.pathname} />
      </div>
    </AnimatePresence>
  );

  

}