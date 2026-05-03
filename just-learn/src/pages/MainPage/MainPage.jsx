import styles from './MainPage.module.css';
import { useState, useEffect } from 'react';
import CustomLink from '../../components/CustomLink';
import { useSelector, useDispatch } from 'react-redux';
import { clearToken } from '../../store/tokenSlice';

function MainPage() {
  const token = useSelector((state) => state.token.tokenValue);
  const isLoading = useSelector((state) => state.token.isLoading);
  const dispatch = useDispatch();

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [profession, setProfession] = useState('');
  const [shortBiography, setShortBiography] = useState('');

  async function getInfo() {
    try {
      const response = await fetch('http://localhost:5000/auth/info', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        throw data;
      }
      setProfession(data.userProfession);
      setLastName(data.lastname);
      setFirstName(data.firstname);
      setShortBiography(data.shortBiography);
    } catch (err) {
      if (err.message === 'Пользователь не авторизован') {
        localStorage.removeItem('token');
        dispatch(clearToken);
      }
    }
  }

  useEffect(() => {
    if (token) {
      getInfo();
    }
  }, [token]);

  return (
    <section className={styles.welcome}>
      <div className={styles.welcome_info}>
        <div className={styles.welcome_info_cont}>
          <p className={styles.welcome_job}>
            {profession ? profession : 'Напишите о себе, на странице профиля'}
          </p>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : token ? (
            <h2 className={styles.welcome_info_title}>
              Привет, я <br />
              <span className={styles.user_name}>
                {lastName} {firstName}
              </span>
            </h2>
          ) : (
            <h2 className={styles.welcome_info_title}>
              Чтобы улучшить ваше резюме
            </h2>
          )}
          <p>{shortBiography}</p>
        </div>
        <div className={styles.links}>
          <CustomLink
            to={token ? 'contacts' : '/login'}
            className={styles.for_my_link}
          >
            Мои контакты
          </CustomLink>
          <CustomLink
            to={token ? 'about_me' : '/login'}
            className={styles.for_my_link}
          >
            Обо мне
          </CustomLink>
        </div>
      </div>
    </section>
  );
}

export default MainPage;
