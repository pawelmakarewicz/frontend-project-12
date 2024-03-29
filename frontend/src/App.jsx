/* eslint-disable react/prop-types */
import { useState, useMemo, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from './contexts/index';
import useAuth from './hooks/useAuth';
import Root from './components/Root';
import ChatPage from './components/chat/ChatPage';
import ErrorPage from './components/ErrorPage';
import LoginPage from './components/login/LoginPage';
import Header from './components/Header';
import routes from './routes';
import getModal from './components/modals/index';
import { hideModal } from './slices/modalSlice';

const USER_ID = 'userId';

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem(USER_ID));
  const logIn = useCallback(async (loggedInData) => {
    const res = await axios.post(routes.loginPath(), loggedInData);
    localStorage.setItem(USER_ID, JSON.stringify(res.data));
    setLoggedIn(true);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem(USER_ID);
    setLoggedIn(false);
  }, []);

  const authValue = useMemo(
    () => (
      { loggedIn, logIn, logOut }),
    [loggedIn, logIn, logOut],
  );

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

function PrivateRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
}

function Modal() {
  const dispatch = useDispatch();
  const onHide = () => dispatch(hideModal());
  const modalType = useSelector((state) => state.modal.type);
  if (!modalType) {
    return null;
  }
  const Component = getModal(modalType);
  return <Component onHide={onHide} />;
}

function App() {
  return (
    <Root>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={(
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              )}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
        <Modal />
      </AuthProvider>
    </Root>
  );
}

export default App;
