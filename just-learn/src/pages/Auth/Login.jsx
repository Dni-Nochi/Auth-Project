import { useState } from 'react';
import styles from './Auth.module.css';
import { Link } from 'react-router-dom';
import MyInput from '../../components/MyInput';

function Login() {
  const [usernameF, setUsernameF] = useState('');
  const [userPassword, setUserPassword] = useState('');

  function getUsername(e) {
    let nameValue = e.target.value;
    setUsernameF(nameValue);
    console.log(usernameF);
  }

  function getUserPassword(e) {
    let userPassword = e.target.value;
    setUserPassword(userPassword);
  }

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
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log({ message: err.message });
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
            onChange: (e) => getUsername(e),
          }}
        />
        <MyInput
          props={{
            type: 'password',
            placeholder: 'password',
            autoComplete: 'current-password',
            className: styles.auth_input,
            onChange: (e) => getUserPassword(e),
          }}
        />
        <Link to={'/'} className={styles.link}>
          Главная страница
        </Link>
        <button onClick={(e) => checkFetch(e)}>Проверка запроса</button>
      </form>
    </div>
  );
}

export default Login;
