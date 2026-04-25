import styles from './Profile.module.css';
import ProfileLeftSideDes from './ProfileFirstLeftSideDes';
import ProfileSecondLeftSide from './ProfileSecondLeftSide';
import ProfileFirstRightSideDes from './ProfileFirstRightSideDes';

function Profile() {
  return (
    <section className={styles.profile_cont}>
      <div className={styles.profile_left_side_cont}>
        <ProfileLeftSideDes />
        <ProfileSecondLeftSide />
      </div>

      <div className={styles.profile_right_side_cont}>
        <ProfileFirstRightSideDes />
      </div>
    </section>
  );
}

export default Profile;
