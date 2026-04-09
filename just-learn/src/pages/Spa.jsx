import { Outlet } from 'react-router-dom';
import Header from './Header/Header';

function Spa() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Spa;
