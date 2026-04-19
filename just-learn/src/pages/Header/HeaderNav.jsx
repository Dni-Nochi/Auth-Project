import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HeaderNav() {
  const token = useSelector((state) => state.token.tokenValue);
  const setActive = ({ isActive }) =>
    isActive ? styles.header_active_links : styles.not_active_link;

  return (
    <nav className={styles.navBar}>
      <ul className={styles.navBar_items}>
        <li>
          <NavLink to={token ? '/' : '/login'} className={setActive}>
            Главная страница
          </NavLink>
        </li>
        <li>
          <NavLink to={token ? 'about_me' : '/login'} className={setActive}>
            Обо мне
          </NavLink>
        </li>
        <li>
          <NavLink to={token ? 'contacts' : '/login'} className={setActive}>
            Мои контакты
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
