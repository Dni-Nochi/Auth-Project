import { Link } from 'react-router';

function Profile() {
  return (
    <div>
      <p>Тут страница пользователя </p>
      <Link to={'/'}>Главная страница</Link>
    </div>
  );
}

export default Profile;
