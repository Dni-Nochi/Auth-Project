import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Profile.module.css';
import LinkInput from '../../components/LinkInput';

function ProfileSecondLeftSide() {
  const token = useSelector((state) => state.token.tokenValue);

  const [gitHubUrl, setGitHubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [headHunterUrl, setHeadHunterUrl] = useState('');
  const [errorGitHubUrl, setErrorGitHubUrl] = useState('');
  const [errorLinkedinUrl, setErrorLinkedinUrl] = useState('');
  const [errorHeadHunter, setErrorHeadHunterUrl] = useState('');
  const [dataAnswer, setDataAnswer] = useState('');

  async function getUserInfo() {
    try {
      const response = await fetch('http://localhost:5000/auth/info', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (!response.ok) throw data;

      setGitHubUrl(data.gitHubUrl || '');
      setLinkedinUrl(data.linkedinUrl || '');
      setHeadHunterUrl(data.headHunterUrl || '');
    } catch (err) {
      console.log(err);
    }
  }

  async function updateLinks() {
    try {
      const response = await fetch('http://localhost:5000/auth/urls', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          gitHubUrl: gitHubUrl,
          linkedinUrl: linkedinUrl,
          headHunterUrl: headHunterUrl,
        }),
      });
      const data = await response.json();

      if (!response.ok) throw data;
      setDataAnswer(data.message);
      setErrorGitHubUrl('');
      setErrorLinkedinUrl('');
      setErrorHeadHunterUrl('');
      console.log(gitHubUrl);
      if (data.message) {
        setTimeout(() => {
          setDataAnswer('');
        }, 1500);
      }
    } catch (err) {
      console.log(err);
      const setters = {
        gitHubUrl: setErrorGitHubUrl,
        linkedinUrl: setErrorLinkedinUrl,
        headHunterUrl: setErrorHeadHunterUrl,
      };
      if (err.field && setters[err.field]) {
        setters[err.field](err.message);
      }
    }
  }

  useEffect(() => {
    if (token) getUserInfo();
  }, [token]);

  return (
    <div className={styles.profile_contact_links}>
      <h2>Ссылки</h2>
      <LinkInput
        icon="GH"
        label="GitHub"
        value={gitHubUrl}
        onChange={setGitHubUrl}
        onSave={updateLinks}
      />
      {errorGitHubUrl}
      <LinkInput
        icon="in"
        label="LinkedIn"
        value={linkedinUrl}
        onChange={setLinkedinUrl}
        onSave={updateLinks}
      />
      {errorLinkedinUrl}
      <LinkInput
        icon="hh"
        label="hh.kz"
        value={headHunterUrl}
        onChange={setHeadHunterUrl}
        onSave={updateLinks}
      />
      {errorHeadHunter}
      {dataAnswer}
    </div>
  );
}

export default ProfileSecondLeftSide;
