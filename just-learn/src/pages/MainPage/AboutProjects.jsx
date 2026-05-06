import styles from './MainPage.module.css';
import MyProjects from '../../components/MyProjects';
import { projects } from '../../staticBD/projectDB';

function AbouttProjects() {
  return (
    <div className={styles.main_project_static_info_projects}>
      <section className={styles.main_project_static_info}>
        <h2>Мои проекты</h2>
        <p className={styles.main_project_static_info_notice}>
          Данная часть страницы статична
        </p>
      </section>

      {projects.map((project) => {
        return (
          <MyProjects
            key={project.id}
            title={project.title}
            image={project.image}
            summary={project.summary}
            description={project.description}
            year={project.year}
            stack={project.stack}
            gitLink={project.gitLink}
          />
        );
      })}
    </div>
  );
}

export default AbouttProjects;
