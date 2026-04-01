import './App.css';
import { BrowserRouter } from 'react-router-dom';
import ReactRoute from './AppRoutes/ReactRoute';
import Spa from './pages/Spa';

function App() {
  return (
    <BrowserRouter>
      <ReactRoute />
    </BrowserRouter>
  );
}

export default App;
