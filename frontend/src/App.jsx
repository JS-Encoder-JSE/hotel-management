import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import ManagerRoute from "./routes/ManagerRoute.jsx";
import Root from "./Root.jsx";
import SignIn from "./pages/SignIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddRoom from "./pages/room/AddRoom.jsx";
import EditRoom from "./pages/room/EditRoom.jsx";
import ManageRoom from "./pages/room/ManageRoom.jsx";
import ManageSingleRoom from "./pages/room/ManageSingleRoom.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <SignIn />,
        },
        {
          path: "dashboard",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
          children: [
            {
              path: "add-room",
              element: (
                <ManagerRoute>
                  <AddRoom />
                </ManagerRoute>
              ),
            },
            {
              path: "edit-room/:id",
              element: (
                <ManagerRoute>
                  <EditRoom />
                </ManagerRoute>
              ),
            },
            {
              path: "manage-room",
              element: (
                <ManagerRoute>
                  <ManageRoom />
                </ManagerRoute>
              ),
            },
            {
              path: "manage-room/:id",
              element: (
                <ManagerRoute>
                  <ManageSingleRoom />
                </ManagerRoute>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
