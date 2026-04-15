import styles from './Header.module.css';
import HeaderNav from './HeaderNav';
import HeaderAuth from './HeaderAuth';
import LoadingScrean from '../../components/LoadingScreen';
import CustomLink from '../../components/CustomLink';

function Header() {
  return (
    <header className={styles.header}>
      <HeaderNav />
      <HeaderAuth />
    </header>
  );
}

export default Header;
