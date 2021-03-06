import HomePage from './pages/HomePage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignInPage from './pages/SignInPage';
import Layout from './layout/Layout';
import TasksPage from './pages/TasksPage';
import HistoryPage from './pages/HistoryPage';
import AccountPage from './pages/AccountPage';
import DashboardPage from './pages/DashboardPage';
import * as Constants from './constants';
import AddTaskPage from './pages/AddTaskPage';
import { AuthProvider } from './context';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={Constants.SIGNIN_PATH} element={ <SignInPage /> } />
            <Route path={Constants.SIGNUP_PATH} element={ <SignInPage signup /> } />
            <Route path={Constants.HOME_PATH} element={ <HomePage /> } />
            <Route path={Constants.TASKS_PATH} element={ <TasksPage /> } />
            <Route path={Constants.HISTORY_PATH} element={ <HistoryPage /> } />
            <Route path={Constants.ACCOUNT_PATH} element={ <AccountPage /> } />
            <Route path={Constants.ADD_TASK_PATH} element={ <AddTaskPage /> } />
            <Route path={Constants.DASHBOARD_PATH} element={ <DashboardPage /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
