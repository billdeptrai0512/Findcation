import { Outlet } from 'react-router-dom';
import Map from './map/main';


//the problem with this is that if the router is / or login then the outlet is on top of the map .
//i prefer to have the main router - then the auth router -> auth/login , auth/reset-password, auth/register ... etc 
//then it would be Outlet for other Router
export default function MainLayout() {

  return (
    <>
      <Map />
      <Outlet /> 
    </>
  );

}