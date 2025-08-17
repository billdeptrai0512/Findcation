import { Outlet } from 'react-router-dom';
import Map from './map/map';

export default function MainLayout() {

  return (
    <>
      <Map />
      <Outlet /> 
    </>    
  );

}