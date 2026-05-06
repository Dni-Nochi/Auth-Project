import styles from './MainPage.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearToken } from '../../store/tokenSlice';
import ActiveAboutMe from './ActiveAboutMe';
import AbouttProjects from './AboutProjects';
import StaticAboutMe from '../AboutMe/StaticAboutMe';

function MainPage() {
  const token = useSelector((state) => state.token.tokenValue);
  const isLoading = useSelector((state) => state.token.isLoading);
  const dispatch = useDispatch();

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [profession, setProfession] = useState('');
  const [shortBiography, setShortBiography] = useState('');
  const [biography, setBiography] = useState('');
  const [stack, setStack] = useState([]);
  const [githubLink, setGitHubLink] = useState('');
  const [linkedinLink, setLinkedinLink] = useState('');
  const [hhLink, setHhLink] = useState();
  const displayDate = birthDate
    ? new Date(birthDate).toLocaleDateString('ru-RU')
    : '';

  async function getInfo() {
    try {
      const response = await fetch('http://localhost:5000/auth/info', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        throw data;
      }
      setLastName(data.lastname);
      setFirstName(data.firstname);
      setEmail(data.email);
      setCity(data.userCity);
      setProfession(data.userProfession);
      if (data.birthDate) {
        const date = new Date(data.birthDate);
        const formatted = date.toISOString().split('T')[0];
        setBirthDate(formatted);
      }
      setShortBiography(data.shortBiography);
      setBiography(data.userBiography);
      setStack(data.userStack);
      setGitHubLink(data.gitHubUrl);
      setLinkedinLink(data.linkedinUrl);
      setHhLink(data.headHunterUrl);
    } catch (err) {
      if (err.message === 'Пользователь не авторизован') {
        localStorage.removeItem('token');
        dispatch(clearToken());
      }
    }
  }

  useEffect(() => {
    if (token) {
      getInfo();
    }
  }, [token]);

  return (
    <main className={styles.welcome}>
      <ActiveAboutMe
        token={token}
        isLoading={isLoading}
        lastName={lastName}
        firstName={firstName}
        birthDate={displayDate}
        email={email}
        city={city}
        profession={profession}
        shortBiography={shortBiography}
        biography={biography}
        stack={stack}
        githubLink={githubLink}
        linkedinLink={linkedinLink}
        hhLink={hhLink}
      />

      <AbouttProjects />
      <StaticAboutMe />
    </main>
  );
}

export default MainPage;
