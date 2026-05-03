import styles from './ForComponents.module.css';
import { useState } from 'react';
function LinkInput({ icon, label, value, onChange, onSave, errorMessage }) {
  const hasValue = value && value.trim();
  const [redactLink, setRedactLink] = useState(false);

  function saveValue(e) {
    if (e.key === 'Enter') {
      setRedactLink(false);
      onSave();
    }
  }

  return (
    <div className={styles.contact_link}>
      {redactLink || errorMessage || !hasValue ? (
        <span className={styles.contact_icon}>{icon}</span>
      ) : (
        <a
          className={styles.contact_icon}
          href={hasValue}
          target="_blank"
          rel="noreferrer"
        >
          {icon}
        </a>
      )}
      {redactLink || hasValue === '' || errorMessage ? (
        <input
          value={hasValue || ''}
          placeholder={`Добавить ${label}`}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => saveValue(e)}
          disabled={!redactLink}
        />
      ) : (
        <a
          href={hasValue ? hasValue : undefined}
          className={styles.contact_text_link}
          target="_blank"
        >
          {label}
        </a>
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
