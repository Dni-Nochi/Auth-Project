import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import NotAuthPage from './NotAuthPage/NotAuthPage';
import '../App.css';

function Spa() {
  return (
    <>
      <Header />
      <main className="main_rel">
        <Outlet />
      </main>
    </>
  );
}

export default Spa;
