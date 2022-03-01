import HomePage from './components/HomePage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignInPage from './components/SignInPage';
import Layout from './components/Layout';
import TasksPage from './components/TasksPage';
import HistoryPage from './components/HistoryPage';
import AccountPage from './components/AccountPage';
import RequireAuth from './components/RequireAuth';
import * as Constants from './constants';
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const auth = getAuth();
  const [user, setUser] = useState(undefined);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={Constants.SIGNIN_PATH} element={ <SignInPage user={user} /> } />
          <Route path={Constants.HOME_PATH} element={ <RequireAuth user={user}><HomePage user={user} /></RequireAuth> } />
          <Route path={Constants.TASKS_PATH} element={ <RequireAuth user={user}><TasksPage user={user} /></RequireAuth> } />
          <Route path={Constants.HISTORY_PATH} element={ <RequireAuth user={user}><HistoryPage user={user} /></RequireAuth> } />
          <Route path={Constants.ACCOUNT_PATH} element={ <RequireAuth user={user}><AccountPage user={user} /></RequireAuth> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
