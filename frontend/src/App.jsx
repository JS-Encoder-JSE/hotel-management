import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Providers from "./providers/index.jsx";
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
import CheckIn from "./pages/room/CheckIn.jsx";
import AddFood from "./pages/restaurant/AddFood.jsx";
import EditFood from "./pages/restaurant/EditFood.jsx";
import AddOrder from "./pages/restaurant/AddOrder.jsx";
import FoodInventory from "./pages/restaurant/FoodInventory.jsx";
import AddInventory from "./pages/Inventory/AddInventory.jsx";
import EditInventory from "./pages/Inventory/EditInventory.jsx";
import ManageInventory from "./pages/Inventory/ManageInventory.jsx";
import AddEmployee from "./pages/employee/AddEmployee.jsx";
import EditEmployee from "./pages/employee/EditEmployee.jsx";
import ManageEmployee from "./pages/employee/ManageEmployee.jsx";
import MonitorFinance from "./pages/MonitorFinance/MonitorFinance.jsx";
import SalesProfitReport from "./pages/report/SalesProfitReport.jsx";
import ManageBooking from "./pages/room/ManageBooking.jsx";
import ManagerEdit from "./components/ManagerEdit/ManagerEdit.jsx";
import HotelEdit from "./components/HotelEdit/HotelEdit.jsx";
import CheckOut from "./pages/room/CheckOut/CheckOut.jsx";
import UserDashBoard from "./components/UserDashBoard/UserDashBoard.jsx";
import BookingView from "./pages/room/BookingView.jsx";
import CheckPDF from "./pages/CheckPDF.jsx";
import AddManager from "./pages/OwnerManagerManagement/AddManager.jsx";
import ManagerList from "./pages/OwnerManagerManagement/ManagerList.jsx";
import AddHotel from "./pages/Ownerhotel/AddHotel.jsx";
import HotelLists from "./pages/Ownerhotel/HotelLists.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import RenewList from "./pages/Admin/RenewList.jsx";
import RenewView from "./pages/Admin/RenewView.jsx";
import AdminOwnerList from "./pages/Admin/AdminOwnerList.jsx";
import AdminOwnerView from "./components/Admin/AdminOwnerView.jsx";
import DashboardRoot from "./pages/DashboardRoot.jsx";
import Profile from "./pages/profile/index.jsx";
import EditProfile from "./pages/profile/EditProfile.jsx";
import AdminNewLicense from "./pages/Admin/AdminNewLicense.jsx";
import SuspendAndLockList from "./pages/Admin/SuspendAndLockList.jsx";
import EditRenew from "./pages/Admin/EditRenew.jsx";
import ManagerListView from "./pages/OwnerManagerManagement/ManagerListView.jsx";
import AddSubAdmin from "./pages/Admin/AddSubAdmin.jsx";
import SubAdminList from "./pages/Admin/SubAdminList.jsx";
import SubAdminListView from "./pages/Admin/SubAdminListView.jsx";
import SubAdminProfile from "./pages/Admin/SubAdminProfile.jsx";
import SubAdminChangePass from "./pages/Admin/SubAdminChangePass.jsx";
import ReportView from "./pages/report/ReportView.jsx";
import Report from "./pages/Admin/Report.jsx";
import Error from "./Error.jsx";
import AddBar from "./pages/bar/AddBar.jsx";
import BarItemList from "./pages/bar/BarItemList.jsx";
import BarItemView from "./pages/bar/BarItemView.jsx";
import EditBar from "./pages/bar/EditBar.jsx";
import AddLifeStyle from "./pages/LifeStyle/AddLifeStyle.jsx";
import LifeStyleList from "./pages/LifeStyle/LifeStyleList.jsx";


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
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
              index: true,
              element: <DashboardRoot />,
            },
            {
              path: "check-pdf",
              element: <CheckPDF />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "profile/edit",
              element: <EditProfile />,
            },

            // Manager Sidebar
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
              path: "manage-booking/:id",
              element: (
                <ManagerRoute>
                  <BookingView />
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
                  <ManageInventory />
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
              path: "report/view",
              element: (
                <ManagerRoute>
                  <ReportView />
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
              path: "add-bar",
              element: (
                <ManagerRoute>
                  <AddBar />
                </ManagerRoute>
              ),
            },
            {
              path: "baritem-list",
              element: (
                <ManagerRoute>
                  <BarItemList />
                </ManagerRoute>
              ),
            },
            {
              path: "barItem-listView/:id",
              element: (
                <ManagerRoute>
                  <BarItemView />
                </ManagerRoute>
              ),
            },
            {
              path: "edit-bar/:id",
              element: (
                <ManagerRoute>
                  <EditBar />
                </ManagerRoute>
              ),
            },
            {
              path: "add-lifestyle",
              element: (
                <ManagerRoute>
                  <AddLifeStyle />
                </ManagerRoute>
              ),
            },
            {
              path: "lifestyle-list",
              element: (
                <ManagerRoute>
                  <LifeStyleList />
                </ManagerRoute>
              ),
            },
            // Owner Hotel  Sidebar
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
              path: "hotel-edit/:id",
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
              path: "managerList-view/:id",
              element: (
                <OwnerRoute>
                  <ManagerListView />
                </OwnerRoute>
              ),
            },
            {
              path: "manager-edit/:id",
              element: (
                <OwnerRoute>
                  <ManagerEdit />
                </OwnerRoute>
              ),
            },
            {
              path: "finance",
              element: (
                <OwnerRoute>
                  <MonitorFinance />
                </OwnerRoute>
              ),
            },

            // Admin sidebar
            {
              path: "new-license",
              element: (
                <AdminRoute>
                  <AdminNewLicense />
                </AdminRoute>
              ),
            },
            {
              path: "renew-list",
              element: (
                <AdminRoute>
                  <RenewList />
                </AdminRoute>
              ),
            },

            {
              path: "renew-view/:id",
              element: (
                <AdminRoute>
                  <RenewView />
                </AdminRoute>
              ),
            },
            {
              path: "edit-renew/:id",
              element: (
                <AdminRoute>
                  <EditRenew />
                </AdminRoute>
              ),
            },
            {
              path: "adminowner-list",
              element: (
                <AdminRoute>
                  <AdminOwnerList />
                </AdminRoute>
              ),
            },
            {
              path: "adminowner-view/:id",
              element: (
                <AdminRoute>
                  <AdminOwnerView />
                </AdminRoute>
              ),
            },
            {
              path: "suspend-lock-management/:id",
              element: (
                <AdminRoute>
                  <EditRenew />
                </AdminRoute>
              ),
            },
            {
              path: "suspend-lock-list",
              element: (
                <AdminRoute>
                  <SuspendAndLockList />
                </AdminRoute>
              ),
            },
            {
              path: "add-sub-admin",
              element: (
                <AdminRoute>
                  <AddSubAdmin />
                </AdminRoute>
              ),
            },
            {
              path: "sub-admin-list",
              element: (
                <AdminRoute>
                  <SubAdminList />
                </AdminRoute>
              ),
            },
            {
              path: "sub-admin-list-view/:id",
              element: (
                <AdminRoute>
                  <SubAdminListView />
                </AdminRoute>
              ),
            },
            {
              path: "sub-admin-profile/:id",
              element: (
                <AdminRoute>
                  <SubAdminProfile />
                </AdminRoute>
              ),
            },
            {
              path: "sub-admin-profile/:id/edit",
              element: (
                <AdminRoute>
                  <SubAdminChangePass />
                </AdminRoute>
              ),
            },
            {
              path: "admin-report",
              element: (
                <AdminRoute>
                  <Report />
                </AdminRoute>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};

export default App;
