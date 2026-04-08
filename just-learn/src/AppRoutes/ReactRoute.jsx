import { Routes, Route } from 'react-router-dom';
import Spa from '../pages/Spa';
import MainPage from '../pages/MainPage/MainPage';
import AboutMe from '../pages/AboutMe/AboutMe';
import Contact from '../pages/Contact';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

function ReactRoute() {
  return (
    <Routes>
      <Route path="/" element={<Spa />}>
        <Route index element={<MainPage />} />
        <Route path="about_me" element={<AboutMe />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default ReactRoute;
