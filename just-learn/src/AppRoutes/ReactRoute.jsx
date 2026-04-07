import { Routes, Route } from 'react-router-dom';
import Spa from '../pages/Spa';
import OurOffers from '../pages/OurOffers';
import AboutUs from '../pages/AboutUs';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import MainPage from '../pages/MainPage';

function ReactRoute() {
  return (
    <Routes>
      <Route path="/" element={<Spa />}>
        <Route index element={<MainPage />} />
        <Route path="offers" element={<OurOffers />} />
        <Route path="us" element={<AboutUs />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default ReactRoute;
