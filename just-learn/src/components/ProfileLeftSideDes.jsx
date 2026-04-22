import styles from './ForComponents.module.css';

function ProfileLeftSideDes() {
  return (
    <div className={styles.profile_short_info}>
      <div>
        <h2 className={styles.profile_short_info_avatar}>short user name</h2>
        <p>user name </p>
        <p>user profession and frimework</p>
      </div>
      <p> short biography</p>
      <div>
        <p>user contacts</p>
      </div>
    </div>
  );
}

export default ProfileLeftSideDes;
