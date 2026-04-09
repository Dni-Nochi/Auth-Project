import CustomLink from '../../components/CustomLink';
import SVG from '../../components/SVG';
import styles from './MainPage.module.css';

function MainPage() {
  return (
    <section className={styles.welcome}>
      <div className={styles.welcome_info}>
        <div className={styles.welcome_info_cont}>
          <h1 className={styles.welcome_info_title}>Привет, я Адилов Тимур.</h1>
          <p>
            Развиваюсь в сфере frontend-разработки и активно изучаю новые для
            себя технологии
          </p>
        </div>
        <div className={styles.svg_cont}>
          <CustomLink to={'contacts'} styles={styles.for_my_link}>
            Мои контакты
            <div className={styles.in_link_point}></div>
          </CustomLink>
          <a
            href="https://www.linkedin.com/in/%D1%82%D0%B8%D0%BC%D1%83%D1%80-%D0%B0%D0%B4%D0%B8%D0%BB%D0%BE%D0%B2-920684344/"
            target="_blank"
          >
            <SVG
              id={'linkedin'}
              width={26}
              height={26}
              svgStyles={styles.svg_stroke}
            />
          </a>
          <a href="https://github.com/Dni-Nochi" target="_blank">
            <SVG
              id={'github'}
              width={26}
              height={26}
              svgStyles={styles.svg_stroke}
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export default MainPage;
