import styles from './AboutMe.module.css';

function AboutMe() {
  return (
    <section className={styles.intro}>
      <h2 className={styles.for_me}>Про меня</h2>
      <div className={styles.intro_my_way}>
        <p className={styles.for_me_expanded}>
          Я frontend разработчик, осознанно начал свой путь со второго курса
          университета
        </p>
        <p className={styles.for_me_expanded_info}>
          Меня зовут Тимур, мне 21 год, я заканчиваю четвёртый курс университета
          МУИТ и с большим интересом занимаюсь разработкой сайтов. Коммерческого
          опыта у меня пока нет, но я готов его получить. Свои навыки я
          реализовывал в небольших pet-проектах.
        </p>
      </div>
    </section>
  );
}

export default AboutMe;
