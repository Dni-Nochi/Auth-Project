import styles from './Header.module.css';
import HeaderNav from './HeaderNav';
import HeaderAuth from './HeaderAuth';
import LoadingScrean from '../../components/LoadingScreen';
import CustomLink from '../../components/CustomLink';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_structure}>
        <CustomLink to={'/'} className={styles.project_name}>
          <h1>CVDev.com</h1>
        </CustomLink>
        <HeaderNav />
        <HeaderAuth />
      </div>
    </header>
  );
}

export default Header;
