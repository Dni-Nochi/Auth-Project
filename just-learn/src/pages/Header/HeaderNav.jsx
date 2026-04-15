import styles from './Header.module.css';
import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../../store/tokenSlice';

function HeaderNav() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.tokenValue);
  console.log(token);
  const setActive = ({ isActive }) =>
    isActive ? styles.header_links : styles.link;

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken && !token) {
      dispatch(setToken(savedToken));
      console.log(token);
    }
  }, []);
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
