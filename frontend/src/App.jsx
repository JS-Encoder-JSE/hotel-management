import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import ManagerRoute from "./routes/ManagerRoute.jsx";
import Root from "./Root.jsx";
import SignIn from "./pages/SignIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddRoom from "./components/AddRoom.jsx";
import AllInventory from "./components/Inventory/AllInventory.jsx";
import AddInventory from "./components/Inventory/AddInventory.jsx";
import Header from "./components/Header.jsx";
import EditRoom from "./pages/room/EditRoom.jsx";
import ManageRoom from "./pages/room/ManageRoom.jsx";
import AddRoom from "./pages/room/AddRoom.jsx";
import AddFood from "./components/AddFood.jsx";
import FoodCard from "./components/Food/FoodCard.jsx";
import EditFood from "./components/Food/EditFood.jsx";
import InventoryFood from "./components/Food/InventoryFood.jsx";
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
              path: "all-inventory",
              element: (
                <ManagerRoute>
                  <AllInventory />
              path: "edit-room/:id",
              element: (
                <ManagerRoute>
                  <EditRoom />
                </ManagerRoute>
              ),
            },
            {
              path: "add-inventory",
              element: (
                <ManagerRoute>
                  <AddInventory />
              path: "manage-room",
              element: (
                <ManagerRoute>
                  <ManageRoom />
                </ManagerRoute>
              ),
            },
            {
              path: "add-food",
              element: (
                <ManagerRoute>
                  <AddFood />
                </ManagerRoute>
              ),
            },
            {
              path: "Foodcard",
              element: (
                <ManagerRoute>
                  <FoodCard />
                </ManagerRoute>
              ),
            },
            {
              path: "inventoryFood",
              element: (
                <ManagerRoute>
                  <InventoryFood />
                </ManagerRoute>
              ),
            },
            {
              path: "edit-food",
              element: (
                <ManagerRoute>
                  <EditFood />
                </ManagerRoute>
              ),
            },
            // {
            //   path: "add-food",
            //   element: <AddFood />,
            // },
            {
              path: "header",
              element: <Header />,
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
