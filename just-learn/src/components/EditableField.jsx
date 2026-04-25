import styles from '../pages/Profile/Profile.module.css';

function EditableField({
  type,
  active,
  value,
  onChange,
  placeholder,
  pClassName,
}) {
  if (active) {
    return (
      <input
        type={type}
        className={styles.profile_short_info_input}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
      />
    );
  }
  return <p className={pClassName}>{value}</p>;
}

export default EditableField;
