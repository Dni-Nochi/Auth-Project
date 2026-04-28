import styles from './Header.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

function HeaderAuth() {
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.token.tokenValue);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const setActive = ({ isActive }) =>
    isActive ? styles.profile : `${styles.profile} ${styles.not_active}`;

  if (loading) {
    return <p className={styles.loading}>Загрузка...</p>;
  }

  if (token) {
    return (
      <NavLink to={'profile'} className={setActive}>
        Профиль
      </NavLink>
    );
  }

  return (
    <nav className={styles.navBar_auth}>
      <Link to={'/login'} className={styles.auth_link}>
        Войти
      </Link>
      <Link to={'/register'} className={styles.auth_link}>
        Регистрация
      </Link>
    </nav>
  );
}

export default HeaderAuth;
