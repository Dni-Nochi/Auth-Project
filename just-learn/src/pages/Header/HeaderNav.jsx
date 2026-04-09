import styles from './Header.module.css';
import { Link, NavLink } from 'react-router-dom';

function HeaderNav() {
  const setActive = ({ isActive }) =>
    isActive ? styles.header_links : styles.link;
  return (
    <nav className={styles.navBar}>
      <ul className={styles.navBar_items}>
        <li>
          <NavLink to={'/'} className={setActive}>
            Главная страница
          </NavLink>
        </li>
        <li>
          <NavLink to={'about_me'} className={setActive}>
            Обо мне
          </NavLink>
        </li>
        <li>
          <NavLink to={'contacts'} className={setActive}>
            Мои контакты
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
