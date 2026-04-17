import styles from './Auth.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyInput from '../../components/MyInput';
import MyBtn from '../../components/MyBtn';

function Register() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dataAnswer, setDataAnswer] = useState('');

  async function registrationPost(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log(data);

      setDataAnswer(data.message);
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setDataAnswer(err.message);
      return { message: err.message };
    }
  }

  return (
    <div className={styles.auth_cont}>
      <div className={styles.auth_cont_left}>
        <div className={styles.auth_left_info}>
          <h2>Приветствую на сайт возможносетей, CV.com</h2>
          <p>
            Данный сайт является моим pet-проектом, в котором я практикую React,
            Redux Toolkit, React Router DOM, а также взаимодействие между
            сервером и клиентом.
          </p>
        </div>
        <div>
          <p>
            Суть проекта: после авторизации вы заходите в профиль своего
            аккаунта и заполняете данные для их отображения на сайте. Сайт
            представляет собой сборник проектов с кратким описанием и визуальным
            превью - удобно использовать на собеседовании. Все проекты
            подтягиваются с GitHub пользователя.
          </p>
        </div>
      </div>
      <div className={styles.auth_cont_right}>
        <form className={styles.auth_form}>
          <p>Зарегистрироваться</p>
          <div className={styles.auth_form_input_cont}>
            <p>Введите имя</p>
            <MyInput
              props={{
                type: 'text',
                placeholder: 'Введите ваше имя',
                autoComplete: 'username',
                className: styles.auth_input,
                onChange: (e) => {
                  setFirstname(e.target.value);
                },
              }}
            />
          </div>
          <div className={styles.auth_form_input_cont}>
            <p>Введите фамилию</p>
            <MyInput
              props={{
                type: 'text',
                placeholder: 'Введите вашу фамилию',
                autoComplete: 'username',
                className: styles.auth_input,
                onChange: (e) => {
                  setLastname(e.target.value);
                },
              }}
            />
          </div>
          <div className={styles.auth_form_input_cont}>
            <p>Введите почту</p>
            <MyInput
              props={{
                type: 'email',
                placeholder: 'email',
                autoComplete: 'username',
                className: styles.auth_input,
                onChange: (e) => {
                  setEmail(e.target.value);
                },
              }}
            />
          </div>
          <div className={styles.auth_form_input_cont}>
            <p>Введите пароль</p>
            <MyInput
              props={{
                type: 'password',
                placeholder: 'password',
                autoComplete: 'current-password',
                className: styles.auth_input,
                onChange: (e) => {
                  setPassword(e.target.value);
                },
              }}
            />
          </div>
          {dataAnswer}
          <div className={styles.auth_signup}>
            <Link to={'/'} className={styles.link}>
              Главная страница
            </Link>
            <MyBtn
              props={{
                className: styles.auth_btn,
                onClick: (e) => registrationPost(e),
              }}
            >
              Зарегистрироваться
            </MyBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
