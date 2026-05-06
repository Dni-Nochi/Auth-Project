import styles from './Footer.module.css';
import SVG from '../../components/SVG';

function Footer() {
  return (
    <footer className={styles.footer} id="contacts">
      <div className={styles.footer_top}>
        <span>CV.com — pet project</span>
        <span>2026</span>
      </div>
      <hr className={styles.footer_divider} />
      <div className={styles.footer_inner}>
        <div className={styles.footer_name}>
          <h2>Адилов Тимур</h2>
          <p>Frontend разработчик</p>
        </div>
        <div className={styles.footer_links}>
          <a
            className={styles.footer_link}
            href="https://github.com/Dni-Nochi"
            target="_blank"
            rel="noreferrer"
          >
            <span className={`${styles.footer_badge} ${styles.badge_gh}`}>
              <SVG id={'github'} width={24} height={24} />
            </span>
            GitHub
          </a>
          <a
            className={styles.footer_link}
            href="https://www.linkedin.com/in/%D1%82%D0%B8%D0%BC%D1%83%D1%80-%D0%B0%D0%B4%D0%B8%D0%BB%D0%BE%D0%B2-920684344/"
            target="_blank"
            rel="noreferrer"
          >
            <span className={`${styles.footer_badge} ${styles.badge_in}`}>
              <SVG id={'linkedin'} width={20} height={20} />
            </span>
            Linkedin
          </a>
          <a
            className={styles.footer_link}
            href="https://hh.kz"
            target="_blank"
            rel="noreferrer"
          >
            hh
          </a>
          <a className={styles.footer_link} href="mailto:your@gmail.com">
            <span className={`${styles.footer_badge} ${styles.badge_gm}`}>
              @
            </span>
            adilovtimur14@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
