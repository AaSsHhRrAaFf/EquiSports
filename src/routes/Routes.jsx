// src/routes/Routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import App  from '../App';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
/* import App from '../App';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register'; */

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      }
    ]
  }
]);

export default router;
