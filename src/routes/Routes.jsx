import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/NotFoundPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import AddEquipment from "../pages/AddEquipment";
import PrivateRoute from "./PrivateRoute";
import AllSportsEquipment from "../pages/AllSportsEquipment";
import MyEquipment from "../pages/MyEquipment";
import UpdateEquipment from "../pages/UpdateEquipment";
import EquipmentDetails from "../pages/EquipmentDetails";
import NotFoundPage from "../pages/NotFoundPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/add-equipment",
        element: (
          <PrivateRoute>
            <AddEquipment />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-equipment",
        element: <AllSportsEquipment />,
      },
      {
        path: "/my-equipment",
        element: (
          <PrivateRoute>
            <MyEquipment />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-equipment/:id",
        element: (
          <PrivateRoute>
            <UpdateEquipment />
          </PrivateRoute>
        ),
      },
      {
        path: "/equipment/:id",
        element: (
          <PrivateRoute>
            <EquipmentDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
