import { Link } from 'react-router-dom';

function HeaderNav({ styles }) {
  return (
    <nav className={styles.navBar}>
      <ul className={styles.navBar_items}>
        <Link to={'/'}>Главная страница</Link>
        <Link to={'offers'}>Наши предложения</Link>
      </ul>
    </nav>
  );
}

export default HeaderNav;
