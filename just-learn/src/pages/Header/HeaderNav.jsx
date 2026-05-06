import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HeaderNav() {
  const token = useSelector((state) => state.token.tokenValue);
  const setActive = ({ isActive }) =>
    isActive ? styles.header_active_links : styles.not_active_link;

  return (
    <nav>
      <ul className={styles.navBar_items}>
        <li>
          <NavLink to={token ? '/' : '/login'} className={setActive}>
            Главная страница
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
