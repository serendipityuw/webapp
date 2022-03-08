import HomePage from './pages/HomePage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignInPage from './pages/SignInPage';
import Layout from './layout/Layout';
import TasksPage from './pages/TasksPage';
import HistoryPage from './pages/HistoryPage';
import AccountPage from './pages/AccountPage';
import RequireAuth from './layout/RequireAuth';
import * as Constants from './constants';
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AddTaskPage from './pages/AddTaskPage';

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
          <Route path={Constants.SIGNUP_PATH} element={ <SignInPage signup /> } />
          <Route path={Constants.HOME_PATH} element={ <HomePage user={user} /> } />
          <Route path={Constants.TASKS_PATH} element={ <RequireAuth user={user}><TasksPage user={user} /></RequireAuth> } />
          <Route path={Constants.HISTORY_PATH} element={ <RequireAuth user={user}><HistoryPage user={user} /></RequireAuth> } />
          <Route path={Constants.ACCOUNT_PATH} element={ <RequireAuth user={user}><AccountPage user={user} /></RequireAuth> } />
          <Route path={Constants.ADD_TASK_PATH} element={ <RequireAuth user={user}><AddTaskPage user={user} /></RequireAuth> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
