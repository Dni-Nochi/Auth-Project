import styles from './Profile.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserSkills from '../../components/UserSkills';
function ProfileFirstRightSideDes() {
  const token = useSelector((state) => state.token.tokenValue);
  const [redact, setRedact] = useState(false);
  const [stackActive, setStackActive] = useState(false);
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [profession, setProfession] = useState('');
  const [city, setCity] = useState('');
  const [biography, setBiography] = useState('');
  const [dataMessage, setDataMessage] = useState('');

  function rotateRedact() {
    setRedact(!redact);
  }

  async function getUserInfo() {
    try {
      const response = await fetch('http://localhost:5000/auth/info', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }
      setStack(data.userStack);
      setProfession(data.userProfession);
      setCity(data.userCity);
      setBiography(data.userBiography);
    } catch (err) {
      console.log(err);
    }
  }

  function createSkill() {
    if (inputValue.trim()) {
      setStack([
        ...stack,
        { value: inputValue, id: Date.now() + Math.random() },
      ]);
      setInputValue('');
    }
  }

  async function userUpdateRequest() {
    try {
      const response = await fetch('http://localhost:5000/auth/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userStack: stack,
          userProfession: profession,
          userCity: city,
          userBiography: biography,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      console.log(data.message, token);
      setDataMessage(data.message);
      if (data.message) {
        setTimeout(() => {
          setDataMessage('');
          setRedact(false);
        }, 1500);
      }
    } catch (err) {
      console.log(err);
      setDataMessage(err.message);
    }
  }

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token]);
  return (
    <div className={`${styles.profile_main} ${redact ? styles.active : ''}`}>
      <div className={styles.profile_main_title}>
        <p>Основная информация</p>
        <p className={styles.profile_prof}>Профессия</p>
      </div>
      <div className={styles.profile_main_info}>
        <div className={styles.profile_input_cont}>
          <p>Позиция</p>
          <input
            className={styles.profile_input}
            value={profession || ''}
            placeholder="Впишите свою позицию"
            onChange={(e) => setProfession(e.target.value)}
            disabled={!redact}
          />
        </div>
        <div className={styles.profile_input_cont}>
          <p>Город</p>
          <input
            className={styles.profile_input}
            value={city || ''}
            placeholder="Впишите ваш город"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            disabled={!redact}
          />
        </div>
      </div>
      <div>
        <p>О себе</p>
        <textarea
          className={styles.profile_aboutme_input}
          value={biography || ''}
          placeholder="Расскажите про себя"
          onChange={(e) => setBiography(e.target.value)}
          disabled={!redact}
        ></textarea>
      </div>
      <div>
        <p>Стек технологий</p>
        <div className={styles.profile_stack}>
          {stack.map((skill) => {
            return (
              <UserSkills className={styles.user_Skill} key={skill.id}>
                {skill.value}
              </UserSkills>
            );
          })}
        </div>
        <div>
          <button
            onClick={() => {
              setStackActive(!stackActive);
            }}
            className={styles.profile_create_user_skill}
            disabled={!redact}
          >
            + добавить
          </button>
          <input
            placeholder="Ваш стек..."
            className={`${styles.profile_create_skill} ${stackActive && redact ? '' : styles.hidden}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createSkill()}
            disabled={!redact}
          />
        </div>
        <p>{dataMessage}</p>
      </div>
      <div className={styles.profile_redact_cont}>
        {redact ? (
          <div className={styles.profile_redact_save}>
            <button className={styles.profile_save} onClick={rotateRedact}>
              Отменить
            </button>
            <button
              className={styles.profile_save}
              onClick={() => userUpdateRequest()}
            >
              Сохранить
            </button>
          </div>
        ) : (
          <button className={styles.profile_save} onClick={rotateRedact}>
            Изменить
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileFirstRightSideDes;
