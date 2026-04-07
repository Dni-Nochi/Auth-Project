import { Link } from 'react-router-dom';

function HeaderAuth({ styles }) {
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
