import styles from './Profile.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SVG from '../../components/SVG';
import EditableField from '../../components/EditableField';

function ProfileLeftSideDes() {
  const token = useSelector((state) => state.token.tokenValue);
  const [redactActive, setRedactActive] = useState(false);
  const [initials, setInitials] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthDateInput, setBirthDateInput] = useState('');
  const [profession, setProfession] = useState('');
  const [shortBiography, setShortBiography] = useState('');
  const [dataMessage, setDataMessage] = useState('');

  function rotateRedactActive() {
    setRedactActive(!redactActive);
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

      const date = new Date(data.birthDate);
      const formatted = date.toLocaleDateString('ru-RU');

      setInitials(data.firstname[0] + data.lastname[0]);
      setFirstName(data.firstname);
      setLastName(data.lastname);
      setBirthDate(formatted);
      setProfession(data.userProfession);
      setShortBiography(data.shortBiography);
      console.log(data);
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
          birthDate: birthDateInput,
          userProfession: profession,
          shortBiography: shortBiography,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      setDataMessage(data.message);
      if (data.message) {
        setTimeout(() => {
          setDataMessage('');
          setRedactActive(false);
        }, 1500);
      }
    } catch (err) {
      setDataMessage(err.message);
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
        <div className={styles.profile_short_info_fullname_cont}>
          <EditableField
            active={redactActive}
            pClassName={styles.profile_short_info_data_value}
            placeholder={'Фамилия'}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />

          <EditableField
            active={redactActive}
            pClassName={styles.profile_short_info_data_value}
            placeholder={'Имя'}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        {redactActive ? (
          <input
            type="date"
            value={birthDateInput}
            className={styles.profile_short_info_age}
            onChange={(e) => {
              setBirthDateInput(e.target.value);
            }}
          />
        ) : (
          <p>{birthDate}</p>
        )}
        <EditableField
          active={redactActive}
          pClassName={styles.profile_short_info_data_value}
          placeholder={'Ваша отрасль'}
          value={profession}
          onChange={(e) => {
            setProfession(e.target.value);
          }}
        />
      </div>
      <div className={styles.profile_short_cont_avatar}>
        <h2 className={styles.profile_short_info_avatar}>
          {initials}
          <span>
            <SVG
              id={'redact'}
              width={16}
              height={16}
              // className={styles.profile_short_redact}
              useClassName={styles.profile_short_redact_icon}
              onClick={() => setRedactActive(!redactActive)}
            />
          </span>
        </h2>
      </div>
      <div className={styles.profile_short_info_biography}>
        {redactActive ? (
          <textarea
            className={styles.profile_aboutme_input}
            placeholder={'Коротко о вас'}
            value={shortBiography || ''}
            onChange={(e) => {
              setShortBiography(e.target.value);
            }}
          ></textarea>
        ) : (
          <p>{shortBiography}</p>
        )}
      </div>

      <p>{dataMessage}</p>
      {redactActive && (
        <div className={styles.profile_short_info_save}>
          <button className={styles.profile_save} onClick={rotateRedactActive}>
            Отменить
          </button>
          <button
            className={styles.profile_save}
            onClick={() => {
              userUpdateInfo();
            }}
          >
            Сохранить
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileLeftSideDes;
