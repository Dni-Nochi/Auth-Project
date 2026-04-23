import styles from './Auth.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/tokenSlice';
import { Link, useNavigate } from 'react-router-dom';
import MyBtn from '../../components/MyBtn';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [dataAnswer, setDataAnswer] = useState('');

  async function checkFetch(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem('token', data.token);
      dispatch(setToken(data.token));

      setEmailError('');
      setPasswordError('');
      setDataAnswer(data.message);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setEmailError('');
      setPasswordError('');
      if (err.message === 'Введен неверный пароль') {
        setPasswordError(err.message);
      } else {
        setEmailError(err.message);
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
            <input
              type="email"
              placeholder="email"
              autoComplete="username"
              className={
                emailError ? styles.auth_input_error : styles.auth_input
              }
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <p className={styles.auth_error}>{emailError}</p>
          </div>

          <div className={styles.auth_form_input_cont}>
            <p>Ваш пароль</p>
            <input
              type="password"
              placeholder="password"
              autoComplete="current-password"
              className={
                passwordError ? styles.auth_input_error : styles.auth_input
              }
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <p className={styles.auth_error}>{passwordError}</p>
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
              Войти
            </MyBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
