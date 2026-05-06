import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../store/tokenSlice';
import Spa from '../pages/Spa';
import MainPage from '../pages/MainPage/MainPage';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Profile from '../pages/Profile/Profile';
import NotAuthPage from '../pages/NotAuthPage/NotAuthPage';

function ReactRoute() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.token.tokenValue);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');

    if (savedToken && !auth) {
      dispatch(setToken(savedToken));
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Spa />}>
        <Route index element={<MainPage />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default ReactRoute;
