import styles from './Auth.module.css';
import { useState } from 'react';
// import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MyInput from '../../components/MyInput';
import MyBtn from '../../components/MyBtn';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [dataAnswer, setDataAnswer] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errSignalEmail, setErrSignalEmail] = useState(false);
  const [errSignalPassword, setErrSignalPassword] = useState(false);

  async function checkFetch(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: userPassword }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem('token', data.token);

      setDataAnswer(data.message);
      setErrSignalPassword(false);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      if (err.message === 'Введен неверный пароль') {
        setPasswordError(err.message);
        setErrSignalEmail(false);
        setErrSignalPassword(true);
        setEmailError('');
      } else {
        setEmailError(err.message);
        setErrSignalEmail(true);
        setPasswordError('');
      }

      console.log(err.message);
      return { message: err.message };
    }
  }

  return (
    <div className={styles.auth_cont}>
      <div className={styles.auth_cont_left}>
        <h2>Время приключений.</h2>
        <h3>Время к новым возможностям.</h3>
      </div>
      <div className={styles.auth_cont_right}>
        <form className={styles.auth_form}>
          <div className={styles.auth_cont_registr}>
            <p>Создайте свой аккаунт</p>
            <Link to={'/register'}>Зарегистрируйтесь</Link>
          </div>
          <h2>Авторизоваться</h2>
          <div className={styles.auth_form_input_cont}>
            <p>Ваша почта</p>
            <MyInput
              props={{
                type: 'email',
                placeholder: 'email',
                autoComplete: 'username',
                className: errSignalEmail
                  ? styles.auth_input_error
                  : styles.auth_input,
                onChange: (e) => {
                  setEmail(e.target.value);
                },
              }}
            />
            <p className={styles.auth_error}>{emailError}</p>
          </div>

          <div className={styles.auth_form_input_cont}>
            <p>Ваш пароль</p>
            <MyInput
              props={{
                type: 'password',
                placeholder: 'password',
                autoComplete: 'current-password',
                className: errSignalPassword
                  ? styles.auth_input_error
                  : styles.auth_input,
                onChange: (e) => {
                  setUserPassword(e.target.value);
                },
              }}
            />
            {errSignalPassword ? (
              <p className={styles.auth_error}>{passwordError}</p>
            ) : (
              ''
            )}
            <p className={styles.auth_success}>{dataAnswer}</p>
          </div>
          <div className={styles.auth_signin}>
            <p>Забыли пароль?</p>
            <MyBtn
              props={{
                className: styles.auth_btn,
                onClick: (e) => checkFetch(e),
              }}
            >
              Проверка запроса
            </MyBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
