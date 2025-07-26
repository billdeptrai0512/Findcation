import { Outlet } from 'react-router-dom';
import styles from "./map.module.css"
import Map from './map';

export default function MapLayout() {
  return (
    <div className={styles.layout} >
      <Map />
      <Outlet /> 
    </div>
  );
}