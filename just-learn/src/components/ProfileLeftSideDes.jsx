import styles from './ForComponents.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SVG from './SVG';
import EditableField from './EditableField';

function ProfileLeftSideDes() {
  const token = useSelector((state) => state.token.tokenValue);
  const [redactActive, setRedactActive] = useState(false);
  const [initials, setInitials] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profession, setProfession] = useState('');
  const [experience, setExperience] = useState(0);
  const [shortBiography, setShortBiography] = useState('');

  const experienceCheck =
    experience === 0
      ? 'Нет опыта'
      : experience === 1
        ? 'год'
        : experience >= 2 && experience <= 4
          ? 'года'
          : 'лет';

  console.log(redactActive);
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

      console.log(data);
      setInitials(data.firstname[0] + data.lastname[0]);
      setFirstName(data.firstname);
      setLastName(data.lastname);
      setProfession(data.userProfession);
      setExperience(data.userExperience);
      setShortBiography(data.shortBiography);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function userUpdateInfo() {
    try {
      const response = await fetch('http://localhost:5000/auth/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          userProfession: profession,
          userExperience: experience,
          shortBiography: shortBiography,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }
      console.log(data, data.message);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token]);
  return (
    <div className={styles.profile_short_info}>
      <div className={styles.profile_short_info_name_cont}>
        <div className={styles.profile_short_cont_avatar}>
          <h2 className={styles.profile_short_info_avatar}>{initials}</h2>
          <SVG
            id={'redact'}
            width={16}
            height={16}
            className={styles.profile_short_redact}
            useClassName={styles.profile_short_redact_icon}
            onClick={() => setRedactActive(!redactActive)}
          />
        </div>
        <div className={styles.profile_short_info_fullname_cont}>
          {redactActive ? (
            <input
              className={styles.profile_short_info_input}
              placeholder="Имя"
              value={firstName || ''}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          ) : (
            <p>{firstName}</p>
          )}
          {redactActive ? (
            <input
              className={styles.profile_short_info_input}
              placeholder="Фамилия"
              value={lastName || ''}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          ) : (
            <p>{lastName}</p>
          )}
        </div>
        {redactActive ? (
          <input
            className={styles.profile_short_info_input}
            placeholder="Ваша отрасль"
            value={profession || ''}
            onChange={(e) => {
              setProfession(e.target.value);
            }}
          />
        ) : (
          <p>{profession}</p>
        )}

        {redactActive ? (
          <input
            className={styles.profile_short_info_input}
            placeholder="Ваш опыт"
            value={experience || ''}
            onChange={(e) => setExperience(e.target.value)}
          />
        ) : (
          <p>
            Опыт работы: {experience !== 0 ? experience : ''} {experienceCheck}
          </p>
        )}
      </div>
      {redactActive ? (
        <input
          className={styles.profile_short_info_input}
          placeholder="Коротко о себе"
          value={shortBiography || ''}
          onChange={(e) => {
            setShortBiography(e.target.value);
          }}
        />
      ) : (
        <p>{shortBiography}</p>
      )}
      <div>
        <p>user contacts</p>
      </div>
      {redactActive && (
        <button
          className={styles.profile_save}
          onClick={() => {
            userUpdateInfo();
          }}
        >
          Сохранить
        </button>
      )}
    </div>
  );
}

export default ProfileLeftSideDes;
