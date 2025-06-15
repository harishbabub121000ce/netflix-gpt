import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import Header from "./Header";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const Body = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: '/browse',
          element: <Browse />
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Body;
