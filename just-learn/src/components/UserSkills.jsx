import styles from './ForComponents.module.css';

function UserSkills({ children }) {
  return <p className={styles.user_skill}>{children}</p>;
}

export default UserSkills;
