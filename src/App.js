import HomePage from './components/HomePage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignInPage from './components/SignInPage';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/home" element={<HomePage />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
