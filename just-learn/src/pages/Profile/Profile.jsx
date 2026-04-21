import styles from './Profile.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import UserSkills from '../../components/UserSkills';

function Profile() {
  const token = useSelector((state) => state.token.tokenValue);
  const [stackActive, setStackActive] = useState(false);
  const [stack, setStack] = useState('');
  const [skills, setSkills] = useState([]);

  function createSkill() {
    if (stack.trim()) {
      setSkills([...skills, stack]);
      setStack('');
    }
  }
  async function userUpdateRequest() {
    try {
      const response = await fetch('http://localhost:5000/auth/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userStack: skills }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <section className={styles.profile_cont}>
      <div>
        <p>Расскажите о своей профессии </p>
        <div className={styles.profile_get_info}>
          <input placeholder="Ваша позиция" />
          <input placeholder="Ваш стек" />
          <input placeholder="Опишите свой рабочий опыт" />
        </div>
      </div>

      <div className={styles.profile_main}>
        <div className={styles.profile_main_title}>
          <p>Основная информация</p>
          <p className={styles.profile_prof}>Профессия</p>
        </div>
        <div className={styles.profile_main_info}>
          <div className={styles.profile_input_cont}>
            <p>Позиция</p>
            <input
              className={styles.profile_input}
              placeholder="Впишите свою позицию"
            />
          </div>
          <div className={styles.profile_input_cont}>
            <p>Город</p>
            <input
              className={styles.profile_input}
              placeholder="Впишите ваш город"
            />
          </div>
        </div>
        <div>
          <p>О себе</p>
          <textarea
            className={styles.profile_aboutme_input}
            placeholder="Расскажите про себя"
          ></textarea>
        </div>
        <div>
          <p>Стек технологий</p>
          <div>
            {skills.map((skill, index) => {
              return <UserSkills key={index}>{skill}</UserSkills>;
            })}
          </div>
          <div>
            <button
              onClick={() => {
                setStackActive(!stackActive);
                console.log(stackActive);
              }}
              className={styles.profile_create_user_skill}
            >
              + добавить
            </button>
            <input
              placeholder="Ваш стек..."
              className={
                stackActive
                  ? styles.profile_create_skill
                  : styles.profile_create_skill_no
              }
              onChange={(e) => setStack(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createSkill()}
            />
          </div>
        </div>
        <button
          className={styles.profile_save}
          onClick={() => userUpdateRequest()}
        >
          Сохранить
        </button>
      </div>
    </section>
  );
}

export default Profile;

{
  /* <div>
  <p>О себе</p>
  <input placeholder="Впишите вашу ссылку на hh" />
</div>; */
}
