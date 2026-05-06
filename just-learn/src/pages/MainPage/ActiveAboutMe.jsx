import styles from './MainPage.module.css';
import CustomLink from '../../components/CustomLink';
import SVG from '../../components/SVG';

function ActiveAboutMe({
  token,
  isLoading,
  firstName,
  lastName,
  birthDate,
  email,
  city,
  profession,
  shortBiography,
  biography,
  stack,
  githubLink,
  linkedinLink,
  hhLink,
}) {
  return (
    <div className={styles.main_first_section}>
      <div className={styles.welcome_info}>
        <div className={styles.welcome_info_cont}>
          <p className={styles.welcome_job}>
            {token && profession
              ? profession
              : 'Напишите о себе, на странице профиля'}
          </p>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : token ? (
            <h2 className={styles.welcome_info_title}>
              Привет, я <br />
              <span className={styles.user_name}>
                {lastName} {firstName}
              </span>
            </h2>
          ) : (
            <h2 className={styles.welcome_info_title}>
              Чтобы улучшить ваше резюме
            </h2>
          )}
          <p className={styles.welcome_info_short_biography}>
            {shortBiography}
          </p>
        </div>
        <div className={styles.links}>
          <a className={styles.for_my_link} href="#contacts">
            Мои контакты
          </a>
          <a className={styles.for_my_link} href="#about_me">
            Обо мне
          </a>
        </div>
      </div>

      <article className={styles.main_user_card}>
        <div className={styles.main_user_card_title}>
          <div>
            <span className={styles.main_user_card_name}>
              {lastName}
              {firstName}
            </span>
          </div>
          <h2>CV</h2>
        </div>
        <div className={styles.main_user_card_person_info}>
          <div>
            <p className={styles.main_user_card_person_birth_date}>
              {birthDate ? birthDate : 'Укажите дату рождения'}
            </p>
            <p className={styles.main_user_card_person_profession}>
              {profession ? profession : 'Укажите свою отрасль'}
            </p>
          </div>
          <p>{city ? city : 'Укажите место проживания'}</p>
        </div>

        <div>
          <h3>Про меня</h3>
          <p className={styles.main_user_card_person_biography}>
            {biography ? biography : 'Напишите о себе'}
          </p>
        </div>
        <div className={styles.main_user_card_person_skills}>
          <h3>мой стек</h3>

          {stack.length > 0 ? (
            <div className={styles.main_user_card_person_stack}>
              {stack.map((item) => {
                return (
                  <span
                    key={item.id}
                    className={styles.main_user_card_person_skill}
                  >
                    {item.value}
                  </span>
                );
              })}
            </div>
          ) : (
            'Укажите свой стек'
          )}
        </div>
        <div className={styles.main_user_card_person_contact}>
          <h3>мои контакты</h3>
          <div className={styles.main_user_card_person_contact_links}>
            <a
              className={styles.main_user_card_person_contact_link}
              href={githubLink}
              target="_blank"
              rel="noreferrer"
            >
              <SVG
                id={'github'}
                width={24}
                height={24}
                useClassName={styles.main_user_card_person_contact_link_svg}
              />
              GitHub
            </a>
            <a
              className={styles.main_user_card_person_contact_link}
              href={linkedinLink}
              target="_blank"
              rel="noreferrer"
            >
              <span
                className={styles.main_user_card_person_contact_link_svg_block}
              >
                in
              </span>
              Linkedin
            </a>
            <a
              className={styles.main_user_card_person_contact_link}
              href={hhLink}
              target="_blank"
              rel="noreferrer"
            >
              <span
                className={styles.main_user_card_person_contact_link_svg_block}
              >
                hh
              </span>
              Head Hunter
            </a>
            <a
              className={styles.main_user_card_person_contact_link}
              href={`mailto:${email}`}
            >
              <span
                className={styles.main_user_card_person_contact_link_svg_block}
              >
                @
              </span>
              {email}
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}

export default ActiveAboutMe;
