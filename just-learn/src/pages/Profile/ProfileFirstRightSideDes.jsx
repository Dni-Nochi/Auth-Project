import styles from './Profile.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserSkills from '../../components/UserSkills';
import EditableField from '../../components/EditableField';
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
  const [errorStack, setErrorStack] = useState('');

  function rotateRedact() {
    setRedact(!redact);
  }

  function profileExit() {
    localStorage.removeItem('token');
    setTimeout(() => {
      window.location.reload();
    }, 500);
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
    if (!inputValue.trim()) {
      setErrorStack('');
      return;
    }

    const isDuplicate = stack.some(
      (item) => item.value.toLowerCase() === inputValue.trim().toLowerCase(),
    );

    if (isDuplicate) {
      setErrorStack('Такой навык уже есть');
      return;
    }
    setStack([...stack, { value: inputValue, id: Date.now() + Math.random() }]);
    setInputValue('');
    setErrorStack('');
  }

  async function userUpdateRequest() {
    try {
      const response = await fetch(
        'http://localhost:5000/auth/profile/aboutPerson',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userProfession: profession,
            userCity: city,
            userBiography: biography,
            userStack: stack,
          }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      setDataMessage(data.message);
      if (data.message) {
        setTimeout(() => {
          setDataMessage('');
          setRedact(false);
        }, 1500);
      }
      return true;
    } catch (err) {
      console.log(err);
      setDataMessage(err.message);
      return false;
    }
  }

  async function deleteSkill(skillId) {
    try {
      const response = await fetch(
        `http://localhost:5000/auth/profile/aboutPerson/${skillId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw data;
      }

      setStack(stack.filter((item) => item.id !== skillId));
      setDataMessage(data.message);
      setTimeout(() => {
        setDataMessage('');
      }, 1500);
    } catch (err) {
      console.log(err);
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
      </div>
      <div className={styles.profile_main_info}>
        <div>
          <p className={styles.profile_title_info}>Позиция</p>
          <EditableField
            active={redact}
            value={profession}
            aboutInput={'Впишите свою позицию'}
            placeholder={'Впишите свою позицию'}
            onChange={(e) => setProfession(e.target.value)}
          />
        </div>
        <div>
          <p className={styles.profile_title_info}>Город</p>
          <EditableField
            active={redact}
            value={city}
            aboutInput={'Впишите ваш город'}
            placeholder={'Впишите ваш город'}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.profile_main_biography}>
        <p className={styles.profile_title_info}>О себе</p>
        {!biography && !redact ? (
          <p>Расскажите о себе</p>
        ) : redact ? (
          <textarea
            className={styles.profile_aboutme_input}
            value={biography || ''}
            placeholder="Расскажите про себя"
            onChange={(e) => setBiography(e.target.value)}
            disabled={!redact}
          ></textarea>
        ) : (
          <p>{biography}</p>
        )}
      </div>
      <div className={styles.profile_stack_cont}>
        <p className={styles.profile_title_info}>Стек технологий</p>
        {stack.length > 0 ? (
          <div className={styles.profile_stack}>
            {stack.map((skill) => {
              return (
                <UserSkills
                  active={redact}
                  className={styles.user_Skill}
                  key={skill.id}
                  idItem={skill.id}
                  deleteItem={deleteSkill}
                >
                  {skill.value}
                </UserSkills>
              );
            })}
          </div>
        ) : (
          <p>Впишите свои навыки</p>
        )}
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
            className={`${styles.profile_create_skill} ${stackActive && redact ? '' : styles.hidden} ${errorStack ? styles.profile_data_message_error : ''}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createSkill()}
            disabled={!redact}
          />
        </div>
        <p
          className={`${styles.profile_data_message} ${errorStack ? styles.profile_data_message_error : ''}`}
        >
          {errorStack ? errorStack : dataMessage}
        </p>
      </div>
      <div className={styles.profile_redact_cont}>
        <button className={styles.profile_save} onClick={() => profileExit()}>
          Выйти из аккаунта
        </button>
        {redact ? (
          <div className={styles.profile_redact_save}>
            <button
              className={styles.profile_save}
              onClick={() => {
                rotateRedact();
                setDataMessage('');
                setErrorStack('');
              }}
            >
              Отменить
            </button>
            <button
              className={styles.profile_save}
              onClick={async () => {
                await userUpdateRequest();
              }}
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
