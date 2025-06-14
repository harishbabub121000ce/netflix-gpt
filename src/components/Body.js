import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import Header from "./Header";


const Body = () => {
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: '/browse',
    element: <Browse />
  },
]);
  return (
    <div>
      <Header />
      <RouterProvider router={router} />
    </div>
  );
};
export default Body;
