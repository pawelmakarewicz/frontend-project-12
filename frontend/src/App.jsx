import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/Root';
import ChatPage from './components/chatPage';
import ErrorPage from './components/ErrorPage';
import LoginPage from './components/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ChatPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
