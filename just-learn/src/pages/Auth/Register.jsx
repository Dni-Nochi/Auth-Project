import styles from './Auth.module.css';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div>
      <p>Регистрация</p>
      <Link to={'/'} className={styles.link}>
        Главная страница
      </Link>
    </div>
  );
}

export default Register;
