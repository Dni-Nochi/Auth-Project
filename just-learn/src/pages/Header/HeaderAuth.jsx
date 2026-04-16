import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function HeaderAuth() {
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
