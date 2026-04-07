import { Link } from 'react-router-dom';

function HeaderNav({ styles, checkAuth, setCheckAuth }) {
  return (
    <nav className={styles.navBar}>
      <ul className={styles.navBar_items}>
        {checkAuth ? (
          <Link to={'/'}>Главная страница</Link>
        ) : (
          <Link to={'login'}>Главная страница</Link>
        )}

        {checkAuth ? (
          <Link to={'offers'}>Наши предложения</Link>
        ) : (
          <Link to={'login'}>Наши предложения</Link>
        )}
      </ul>
      <button
        onClick={() => {
          setCheckAuth(!checkAuth);
        }}
      ></button>
    </nav>
  );
}

export default HeaderNav;
