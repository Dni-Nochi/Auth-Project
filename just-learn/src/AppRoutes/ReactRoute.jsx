import { Routes, Route } from 'react-router-dom';
import Spa from '../pages/Spa';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

function ReactRoute() {
  return (
    <Routes>
      <Route path="/" element={<Spa />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default ReactRoute;
