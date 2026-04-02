import styles from './Auth.module.css';
import { Link } from 'react-router-dom';
import MyInput from '../../components/MyInput';

function Register() {
  return (
    <div className={styles.auth_cont}>
      <form className={styles.auth_form}>
        <p>Зарегистрироваться</p>
        <MyInput
          props={{
            type: 'text',
            placeholder: 'Nick name',
            className: styles.auth_input,
          }}
        />
        <MyInput
          props={{
            type: 'email',
            placeholder: 'email',
            autoComplete: 'username',
            className: styles.auth_input,
          }}
        />
        <MyInput
          props={{
            type: 'password',
            placeholder: 'password',
            autoComplete: 'current-password',
            className: styles.auth_input,
          }}
        />
        <Link to={'/'} className={styles.link}>
          Главная страница
        </Link>
      </form>
    </div>
  );
}

export default Register;
