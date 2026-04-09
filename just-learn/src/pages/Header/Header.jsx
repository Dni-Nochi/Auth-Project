import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HeaderNav from './HeaderNav';
import HeaderAuth from './HeaderAuth';
import LoadingScrean from '../../components/LoadingScreen';
import UserProfile from '../../components/UserProfile';

function Header() {
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
    <header className={styles.header}>
      <HeaderNav />
      {loading ? (
        <LoadingScrean styles={styles} text={'Загрузка...'} />
      ) : auth ? (
        <UserProfile styles={styles} />
      ) : (
        <HeaderAuth />
      )}
    </header>
  );
}

export default Header;
