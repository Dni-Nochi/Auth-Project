import styles from './Header.module.css';
import { useState, useEffect } from 'react';
import HeaderNav from './HeaderNav';
import HeaderAuth from './HeaderAuth';
import LoadingScrean from '../../components/LoadingScreen';
import CustomLink from '../../components/CustomLink';

function Header() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  async function fetchProfile() {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/auth/info', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      console.log(data);
      setUsername(data.firstname);
      setAuth(true);
      setLoading(false);
    } catch (err) {
      localStorage.removeItem('token');
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
        <CustomLink to={'/profile'} styles={styles.profile_link}>
          {username}
        </CustomLink>
      ) : (
        <HeaderAuth />
      )}
    </header>
  );
}

export default Header;
