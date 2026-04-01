import styles from './Spa.module.css';
import { Link } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';

function Spa() {
  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <ul className={styles.navBar_items}>
          <li>
            <p>Главная страница</p>
          </li>
          <li>
            <p>Наши предложения</p>
          </li>
          <li>
            <p>О нас</p>
          </li>
        </ul>
      </nav>
      <nav className={styles.navBar_auth}>
        <Link to={'/login'} className={styles.link}>
          Авторизоваться
        </Link>
        <Link to={'/register'} className={styles.link}>
          Регистрация
        </Link>
      </nav>
    </header>
  );
}

export default Spa;
