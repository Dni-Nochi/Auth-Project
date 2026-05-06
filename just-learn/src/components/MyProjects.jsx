import styles from './ForComponents.module.css';
import SVG from './SVG';

function MyProjects({
  title,
  image,
  summary,
  description,
  year,
  stack,
  gitLink,
}) {
  return (
    <article className={styles.my__project_cont}>
      <header className={styles.my__project_header}>
        <p>{title}</p>
        <img src={image} alt="фото проекта" />
      </header>
      <section className={styles.my__project_main_info}>
        <h2>{summary}</h2>
        <p className={styles.my__project_main_info_description}>
          {description}
        </p>
        <div className={styles.my__project_main_info__description_cont}>
          <h3 className={styles.my__project_main_info_description_project_info}>
            информация о проекте
          </h3>
          <dl className={styles.my__project_main_info_description_list}>
            <dt className={styles.my__project_main_info_dt}>Год:</dt>
            <dd className={styles.my__project_main_info_dd}>{year}</dd>
            <dt className={styles.my__project_main_info_dt}>Стек:</dt>
            <dd className={styles.my__project_main_info_dd}>
              {stack.join(', ')}
            </dd>
          </dl>
        </div>
        {gitLink ? (
          <a
            className={styles.my__project_main_info_link}
            href={gitLink}
            rel="noreferrer"
            target="_blank"
          >
            Смотреть на GitHub
            <span>
              <SVG id={'github'} width={24} height={24} />
            </span>
          </a>
        ) : (
          <a
            className={styles.my__project_main_info_link}
            href={image}
            rel="noreferrer"
            target="_blank"
          >
            ссылка на фото
          </a>
        )}
      </section>
    </article>
  );
}

export default MyProjects;
