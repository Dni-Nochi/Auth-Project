import styles from './MainPage.module.css';

function MainPage() {
  return (
    <section className={styles.welcome}>
      <div className={styles.welcome_info}>
        <h1 className={styles.welcome_info_title}>Привет, я Адилов Тимур.</h1>
        <p>
          Развиваюсь в сфере frontend-разработки и активно изучаю новые для себя
          технологии
        </p>
      </div>
    </section>
  );
}

export default MainPage;
