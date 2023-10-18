import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider.jsx";
import Root from "./Root.jsx";
import SignIn from "./pages/SignIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddRoom from "./components/AddRoom.jsx";
import Header from "./pages/Header.jsx";
import AddFood from "./components/AddFood.jsx";

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
          element: <Dashboard />,
          children: [
            {
              path: "add-room",
              element: <AddRoom />,
            },
            {
              path: "add-food",
              element: <AddFood />,
            },
            {
              path: "header",
              element: <Header />,
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
