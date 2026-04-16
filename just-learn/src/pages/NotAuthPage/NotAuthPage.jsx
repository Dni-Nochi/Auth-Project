import styles from './NotAuthPage.module.css';
function NotAuthPage() {
  return (
    <section className={styles.bottom_line}>
      <div className={styles.info_cont}>
        <div className={styles.info}>
          <h2 className={styles.info_title}>
            Приветствую на сайт возможносетей, CV.com
          </h2>
          <p>
            Данный сайт является моим pet-проектом, в котором я практикую React,
            Redux Toolkit, React Router DOM, а также взаимодействие между
            сервером и клиентом.
          </p>
        </div>
        <div className={styles.info_essence}>
          <p>
            Суть проекта: после авторизации вы заходите в профиль своего
            аккаунта и заполняете данные для их отображения на сайте. Сайт
            представляет собой сборник проектов с кратким описанием и визуальным
            превью - удобно использовать на собеседовании. Все проекты
            подтягиваются с GitHub пользователя.
          </p>
        </div>
      </div>
    </section>
  );
}

export default NotAuthPage;
