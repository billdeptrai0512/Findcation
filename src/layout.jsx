import { Outlet } from 'react-router-dom';
import Map from './map/main';

export default function MainLayout() {

  return (
    <>
      <Map />
      <Outlet /> 
    </>
  );

}