/* eslint-disable react/prop-types */
import { useState, useMemo, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import AuthContext from './contexts/index';
import useAuth from './hooks/index';
import ChatPage from './components/chatPage';
import ErrorPage from './components/ErrorPage';
import LoginPage from './components/LoginPage';
import Header from './components/Header';

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = useCallback(() => {
    setLoggedIn(true);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
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

function App() {
  return (
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
    </AuthProvider>
  );
}

export default App;
