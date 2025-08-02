import { Outlet } from 'react-router-dom';
import Listing from './main';

export default function ListingLayout() {

  return (
    <>
      <Listing />
      <Outlet /> 
    </>
  );

}