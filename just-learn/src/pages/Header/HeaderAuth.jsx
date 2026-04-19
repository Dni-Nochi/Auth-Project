import styles from './Header.module.css';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

function HeaderAuth() {
  const token = useSelector((state) => state.token.tokenValue);
  const setActive = ({ isActive }) =>
    isActive ? styles.profile : styles.not_active_profile;

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
