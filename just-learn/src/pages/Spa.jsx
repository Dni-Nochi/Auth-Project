import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import NotAuthPage from './NotAuthPage/NotAuthPage';
import '../App.css';

function Spa() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Spa;
