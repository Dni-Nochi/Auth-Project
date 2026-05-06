import styles from './StaticAboutMe.module.css';

function StaticAboutMe() {
  return (
    <article className={styles.static_about_me_content} id="about_me">
      <h2 className={styles.static_about_me_title}>Про меня</h2>
      <div className={styles.static_about_me_info_cont}>
        <section className={styles.static_about_me_info_part}>
          <h3 className={styles.static_about_me_info_part_title}>
            Адилов Тимур
          </h3>
          <p className={styles.static_about_me_info_part_pre_title}>
            React Front-end разработчик
          </p>
          <p className={styles.static_about_me_info_part_text}>
            Направление - Frontend-разработка. Заканчиваю 4-й курс МУИТ по
            специальности «Сетевая безопасность», однако в процессе учёбы
            увлёкся frontend разработкой и активно развиваюсь в этом
            направлении. Упорен в изучении новых технологий, всегда довожу дело
            до конца и разбираюсь в деталях. Имею опыт работы в других сферах,
            благодаря чему умею слушать и чётко доносить свою мысль.
          </p>
        </section>
        <section>
          <h3 className={styles.static_about_me_info_part_title}>
            Технические Навыки
          </h3>
          <ul className={styles.static_about_me_info_part_skills_text}>
            <li>Стек: HTML, CSS, JavaScript (ES6+), React, TypeScript.</li>
            <li>Стилизация: CSS, SCSS, CSS-модули (React), Tailwind CSS.</li>
            <li>Стейт-менеджмент: Redux Toolkit, базовые React хуки.</li>
            <li>Инструменты: Vite, Fetch/Axios (учу), Git, Figma, mongoDB.</li>
            <li>Тестирование: React Testing Library (учу)</li>
          </ul>
        </section>
        <section className={styles.static_about_me_info_part}>
          <h3 className={styles.static_about_me_info_part_title}>
            Опыт работы
          </h3>
          <p className={styles.static_about_me_info_part_text}>
            Разрабатываю SPA приложение с авторизацией: frontend на React (React
            Router DOM, CSS Modules, компонентная архитектура), backend на
            Node.js + Express с подключением MongoDB через Mongoose, реализовал
            аутентификацию, настроил CORS и работу с переменными окружения.
            Ссылка на проект: разработки. Тут, пет-проект в процессе Так же были
            пет-проекты в которых занимался созданием лендинговых страниц с
            использованием SCSS и методологии БЭМ.
          </p>
        </section>
        <section className={styles.static_about_me_info_part}>
          <h3 className={styles.static_about_me_info_part_title}>
            Образование
          </h3>
          <p className={styles.static_about_me_info_part_text}>
            Бакалавр, Сетевая Безопасность - МУИТ (2022 - 2026) GPA 3 Бакалавр
            сетевая безопасность GPA 3. Дипломный проект: Разработка программной
            системы для анализа и визуализации криптовалютных транзакций с целью
            идентификации соответствующих адресов и отслеживания движения
            средств.
          </p>
        </section>
      </div>
    </article>
  );
}

export default StaticAboutMe;
