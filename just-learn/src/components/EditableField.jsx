import styles from '../pages/Profile/Profile.module.css';

function EditableField({ active, value, onChange, placeholder }) {
  if (active) {
    return (
      <input
        className={styles.profile_short_info_input}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
      />
    );
  }
  return <p>{value}</p>;
}

export default EditableField;
