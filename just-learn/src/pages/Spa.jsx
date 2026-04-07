import styles from './Spa.module.css';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderNav from '../components/HeaderNav';
import HeaderAuth from '../components/HeaderAuth';

function Spa() {
  const [checkAuth, setCheckAuth] = useState(false);

  useEffect(() => {
    console.log(checkAuth);
  }, [checkAuth]);

  return (
    <>
      <header className={styles.header}>
        <HeaderNav
          styles={styles}
          checkAuth={checkAuth}
          setCheckAuth={setCheckAuth}
        />
        <HeaderAuth styles={styles} />
      </header>
      {checkAuth ? (
        <Outlet />
      ) : (
        <h2>Чтобы просмотреть контент авторизуйтесь</h2>
      )}
    </>
  );
}

export default Spa;
