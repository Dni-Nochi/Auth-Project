import styles from './ForComponents.module.css';

function UserSkills({ active, children, idItem, deleteItem }) {
  return (
    <p className={styles.user_skill}>
      {children}
      <span
        className={styles.remove_user_skill}
        onClick={
          active
            ? async () => {
                await deleteItem(idItem);
              }
            : null
        }
      >
        ✕
      </span>
    </p>
  );
}

export default UserSkills;
