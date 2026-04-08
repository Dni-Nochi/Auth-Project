import styles from './Spa.module.css';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import HeaderNav from '../components/HeaderNav';
import HeaderAuth from '../components/HeaderAuth';
import LoadingScrean from '../components/LoadingScreen';
import UserProfile from '../components/UserProfile';

function Spa() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  async function fetchProfile() {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/auth/info', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      console.log(data);
      setAuth(true);
      setLoading(false);
    } catch (err) {
      localStorage.removeItem('token');
      navigate('/login');
      console.log(err.message);
      setAuth(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <header className={styles.header}>
        <HeaderNav styles={styles} />
        {loading ? (
          <LoadingScrean styles={styles} text={'Загрузка...'} />
        ) : auth ? (
          <UserProfile styles={styles} />
        ) : (
          <HeaderAuth styles={styles} />
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Spa;
