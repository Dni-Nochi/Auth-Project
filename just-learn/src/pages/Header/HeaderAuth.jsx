import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function HeaderAuth() {
  return (
    <nav className={styles.navBar_auth}>
      <Link to={'/login'} className={styles.link}>
        Авторизоваться
      </Link>
      <Link to={'/register'} className={styles.link}>
        Регистрация
      </Link>
    </nav>
  );
}

export default HeaderAuth;
