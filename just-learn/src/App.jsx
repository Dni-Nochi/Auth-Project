import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import ReactRoute from './AppRoutes/ReactRoute';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ReactRoute />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
