import styles from './Spa.module.css';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import HeaderNav from '../components/HeaderNav';
import HeaderAuth from '../components/HeaderAuth';

function Spa() {
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
    } catch (err) {
      localStorage.removeItem('token');
      navigate('/login');
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <header className={styles.header}>
        <HeaderNav styles={styles} />
        <HeaderAuth styles={styles} />
      </header>
    </>
  );
}

export default Spa;
