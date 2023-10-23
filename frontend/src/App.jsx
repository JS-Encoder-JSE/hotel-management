import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import OwnerRoute from "./routes/OwnerRoute.jsx";
import ManagerRoute from "./routes/ManagerRoute.jsx";
import Root from "./Root.jsx";
import SignIn from "./pages/SignIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddRoom from "./pages/room/AddRoom.jsx";
import EditRoom from "./pages/room/EditRoom.jsx";
import ManageRoom from "./pages/room/ManageRoom.jsx";
import ManageSingleRoom from "./pages/room/ManageSingleRoom.jsx";
// import ManageBooking from "./pages/room/ManageBooking.jsx";
import CheckIn from "./pages/room/CheckIn.jsx";
import AddFood from "./pages/restaurant/AddFood.jsx";
import EditFood from "./pages/restaurant/EditFood.jsx";
import AddOrder from "./pages/restaurant/AddOrder.jsx";
import FoodInventory from "./pages/restaurant/FoodInventory.jsx";
import AddInventory from "./pages/Inventory/AddInventory.jsx";
import EditInventory from "./pages/Inventory/EditInventory.jsx";
import InventoryLists from "./pages/Inventory/InventoryLists.jsx";
import AddEmployee from "./pages/employee/AddEmployee.jsx";
import EditEmployee from "./pages/employee/EditEmployee.jsx";
import ManageEmployee from "./pages/employee/ManageEmployee.jsx";
import SalesProfitReport from "./pages/SalesProfitReport.jsx";

import ManageBooking from "./pages/room/ManageBooking.jsx";
// import CheckIn from "./pages/room/CheckIn.jsx";
// import AddFood from "./components/Food/AddFood.jsx";
// import OwnerRoute from "./routes/OwnerRoute.jsx";
import AddManager from "./pages/ManagerManagement/AddManager.jsx";
import ManagerList from "./pages/ManagerManagement/ManagerList.jsx";
import ManagerEdit from "./components/ManagerEdit/ManagerEdit.jsx";
import HotelEdit from "./components/HotelEdit/HotelEdit.jsx";
import AddHotel from "./pages/hotel/AddHotel.jsx";
import HotelLists from "./pages/hotel/HotelLists.jsx";
import CheckOut from "./pages/room/CheckOut/CheckOut.jsx";


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

            // Manager Sideber
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
            {
              path: "manage-booking",
              element: (
                <ManagerRoute>
                  <ManageBooking />
                </ManagerRoute>
              ),
            },
            {
              path: "checkin",
              element: (
                <ManagerRoute>
                  <CheckIn />
                </ManagerRoute>
              ),
            },
            {
              path: "checkout",
              element: (
                <ManagerRoute>
                  <CheckOut />
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
              path: "edit-food/:id",
              element: (
                <ManagerRoute>
                  <EditFood />
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
            {
              path: "food-inventory",
              element: (
                <ManagerRoute>
                  <FoodInventory />
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
              path: "all-inventory",
              element: (
                <ManagerRoute>
                  <InventoryLists />
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
            // Owner Hotel  Sideber
            {

              path: "add-hotel",
              element: (
                <OwnerRoute>
                  <AddHotel />
                </OwnerRoute>
              ),
            },
            {
              path: "hotel-list",
              element: (
                <OwnerRoute>
                  <HotelLists />
                </OwnerRoute>
              ),
            },
            {
              path: "hotel-edit",
              element: (
                <OwnerRoute>
                  <HotelEdit />
                </OwnerRoute>
              ),
            },
            {
              path: "add-manager",
              element: (
                <OwnerRoute>
                  <AddManager />
                </OwnerRoute>
              ),
            },
            {
              path: "manager-list",
              element: (
                <OwnerRoute>
                  <ManagerList />
                </OwnerRoute>
              ),
            },
            {
              path: "manager-edit",
              element: (
                <OwnerRoute>
                  <ManagerEdit />
                </OwnerRoute>
              ),
            },

            // Admin sideber
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
