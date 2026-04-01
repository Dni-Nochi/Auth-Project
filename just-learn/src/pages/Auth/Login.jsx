import styles from './Auth.module.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <p>Авторизоваться</p>
      <Link to={'/'} className={styles.link}>
        Главная страница
      </Link>
    </div>
  );
}

export default Login;
