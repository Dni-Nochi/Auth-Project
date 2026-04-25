import styles from './ForComponents.module.css';
import { useState } from 'react';
function LinkInput({ icon, label, value, onChange, onSave }) {
  const hasValue = value && value.trim();
  const [redactLink, setRedactLink] = useState(false);
  function saveValue(e) {
    if (e.key === 'Enter') {
      onSave();
    }
  }
  return (
    <div className={styles.contact_link}>
      <span className={styles.contact_icon}>{icon}</span>
      {hasValue && !redactLink ? (
        <a href={hasValue} target="_blank">
          {hasValue}
        </a>
      ) : (
        <input
          value={hasValue || ''}
          placeholder={`Добавить ${label}`}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => saveValue(e)}
        />
      )}
      <button
        className={styles.contact_action}
        onClick={() => setRedactLink(!redactLink)}
      >
        {redactLink ? '+' : '✎'}
      </button>
    </div>
  );
}

export default LinkInput;
