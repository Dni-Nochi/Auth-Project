import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from './Header/Header';

function Spa() {
  const [auth, setAuth] = useState(null);

  async function getToken() {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/auth/info', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      console.log(token);
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message);
      }

      setAuth(token);
    } catch (err) {
      setAuth(null);
      console.log(err.message);
    }
  }

  useEffect(() => {
    getToken();
  }, []);
  return (
    <>
      {auth === null ? <Link to={'/login'}>login</Link> : <Header />}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Spa;
