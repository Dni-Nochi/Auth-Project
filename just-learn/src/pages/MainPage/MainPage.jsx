import CustomLink from '../../components/CustomLink';
import SVG from '../../components/SVG';
import styles from './MainPage.module.css';

function MainPage() {
  return (
    <section className={styles.welcome}>
      <div className={styles.welcome_info}>
        <div className={styles.welcome_info_cont}>
          <p className={styles.welcome_job}>Frontend разработчик</p>
          <h2 className={styles.welcome_info_title}>
            Привет, я <br />
            <span className={styles.user_name}>Адилов Тимур.</span>
          </h2>
          <p className={styles.user_info}>
            Развиваюсь в сфере frontend-разработки и активно изучаю новые для
            себя технологии
          </p>
        </div>
        <div className={styles.links}>
          <CustomLink to={'contacts'} styles={styles.for_my_link}>
            Мои контакты
          </CustomLink>
          <CustomLink to={'about_me'} styles={styles.for_my_link}>
            Обо мне
          </CustomLink>
        </div>
      </div>
      <div className={styles.welcome_right}>
        <h2 className={styles.welcome_initials}>АТ</h2>
        <h3>Адилов Тимур</h3>
        <p>Frontend React</p>
        <span className={styles.welcome_line}></span>
        <div className={styles.welcome_exp}>
          <div className={styles.welcome_exp_}>
            <p>3+</p>
            <span>проекта</span>
          </div>
          <div className={styles.welcome_exp_}>
            <p>2+</p>
            <span>года</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainPage;
