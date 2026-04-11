import styles from './Auth.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyInput from '../../components/MyInput';

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
      <form className={styles.auth_form}>
        <p>Зарегистрироваться</p>
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
        <Link to={'/'} className={styles.link}>
          Главная страница
        </Link>
        {dataAnswer}
        <button
          onClick={(e) => {
            registrationPost(e);
          }}
        >
          Отправить
        </button>
      </form>
    </div>
  );
}

export default Register;
