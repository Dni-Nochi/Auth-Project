import styles from './Spa.module.css';
import Login from './Login';
import Register from './Register';

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
        <Login />
        <Register />
      </nav>
    </header>
  );
}

export default Spa;
