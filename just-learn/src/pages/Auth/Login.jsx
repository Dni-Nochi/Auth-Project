import styles from './Auth.module.css';
import { useState } from 'react';
// import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MyInput from '../../components/MyInput';

function Login() {
  const navigate = useNavigate();

  const [usernameF, setUsernameF] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [dataAnswer, setDataAnswer] = useState('');

  async function checkFetch(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usernameF, password: userPassword }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem('token', data.token);

      setDataAnswer(data.status);
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setDataAnswer(err.message);
      return { message: err.message };
    }
  }

  return (
    <div className={styles.auth_cont}>
      <form className={styles.auth_form}>
        <p>Авторизоваться</p>
        <MyInput
          props={{
            type: 'email',
            placeholder: 'email',
            autoComplete: 'username',
            className: styles.auth_input,
            onChange: (e) => {
              setUsernameF(e.target.value);
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
              setUserPassword(e.target.value);
            },
          }}
        />
        <Link to={'/register'} className={styles.link}>
          Зарегистрироваться, если нет аккаунта
        </Link>
        {dataAnswer}
        <button onClick={(e) => checkFetch(e)}>Проверка запроса</button>
      </form>
    </div>
  );
}

export default Login;
