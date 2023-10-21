import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import ManagerRoute from "./routes/ManagerRoute.jsx";
import Root from "./Root.jsx";
import SignIn from "./pages/SignIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Header from "./components/Header.jsx";
import EditRoom from "./pages/room/EditRoom.jsx";
import ManageRoom from "./pages/room/ManageRoom.jsx";
import AddRoom from "./pages/room/AddRoom.jsx";
import FoodCard from "./components/Food/FoodCard.jsx";
import EditFood from "./components/Food/EditFood.jsx";
import InventoryFood from "./components/Food/InventoryFood.jsx";
import ManageSingleRoom from "./pages/room/ManageSingleRoom.jsx";
import AddEmployee from "./pages/employee/AddEmployee.jsx";
import EditEmployee from "./pages/employee/EditEmployee.jsx";
import ManageEmployee from "./pages/employee/ManageEmployee.jsx";
import AllInventory from "./pages/Inventory/AllInventory.jsx";
import AddInventory from "./pages/Inventory/AddInventory.jsx";
import ManageFood from "./components/Food/ManageFood.jsx";
import SalesProfitReport from "./pages/SalesProfitReport.jsx";
import AddOrder from "./pages/restaurant/AddOrder.jsx";
import EditInventory from "./pages/Inventory/EditInventory.jsx";
import AddFood from "./components/Food/AddFood.jsx";
import OwnerRoute from "./routes/OwnerRoute.jsx";
import AddHotels from "./pages/Owner- Add-Hotels/AddHotels.jsx";
import HotelList from "./pages/Owner- Add-Hotels/HotelList.jsx";

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
              path: "all-inventory",
              element: (
                <ManagerRoute>
                  <AllInventory />
                </ManagerRoute>
              ),
            },
            {
              path: "add-inventory",
              element: (
                <ManagerRoute>
                  <AddInventory />
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
              path: "edit-food/:id",
              element: (
                <ManagerRoute>
                  <EditFood />
                </ManagerRoute>
              ),
            },
            {
              path: "manage-food/:id",
              element: (
                <ManagerRoute>
                  <ManageFood />
                </ManagerRoute>
              ),
            },
            {
              path: "edit-inventory/:id",
              element: (
                <ManagerRoute>
                  <EditInventory />
                </ManagerRoute>
              ),
            },
          
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
            {
              path: "add-employee",
              element: (
                <ManagerRoute>
                  <AddEmployee />
                </ManagerRoute>
              ),
            },
            {
              path: "edit-employee/:id",
              element: (
                <ManagerRoute>
                  <EditEmployee />
                </ManagerRoute>
              ),
            },
            {
              path: "manage-employee",
              element: (
                <ManagerRoute>
                  <ManageEmployee />
                </ManagerRoute>
              ),
            },
            {
              path: "report",
              element: (
                <ManagerRoute>
                  <SalesProfitReport />
                </ManagerRoute>
              ),
            },
            {
              path: "add-order",
              element: (
                <ManagerRoute>
                  <AddOrder />
                </ManagerRoute>
              ),
            },
            // Owner Hotel 
            {
              path: "add-hotel",
              element: (
                <OwnerRoute>
                  <AddHotels />
                </OwnerRoute>
              ),
            },
            {
              path: "hotel-list",
              element: (
                <OwnerRoute>
                  <HotelList />
                </OwnerRoute>
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
