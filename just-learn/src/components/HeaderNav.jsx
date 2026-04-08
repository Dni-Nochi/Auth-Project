import { Link } from 'react-router-dom';

function HeaderNav({ styles }) {
  return (
    <nav className={styles.navBar}>
      <ul className={styles.navBar_items}>
        <Link to={'/'}>Главная страница</Link>
        <Link to={'about_me'}>Обо мне</Link>
        <Link to={'contact'}>Мои контакты</Link>
      </ul>
    </nav>
  );
}

export default HeaderNav;
