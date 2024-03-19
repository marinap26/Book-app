import BooksPage from "../pages/Books/BooksPage";
import { Error } from "../components/Error";
import LoginPage from "../pages/Auth/LoginPage";
import PrivateGuard from "../guards/PrivateGuard";
import PrivateLayout from "../layouts/PrivateLayout";
import PublicGuard from "../guards/PublicGuard";
import PublicLayout from "../layouts/PublicLayout";
import RegisterPage from "../pages/Auth/RegisterPage";
import { useRoutes } from "react-router-dom";

const Routers = () =>
  useRoutes([
    {
      path: "/",
      element: (
        <PublicGuard>
          <PublicLayout>
            <LoginPage />
          </PublicLayout>
        </PublicGuard>
      ),
      index: true,
    },
    {
      path: "login",
      element: (
        <PublicGuard>
          <PublicLayout>
            <LoginPage />
          </PublicLayout>
        </PublicGuard>
      ),
    },
    {
      path: "/register",
      element: (
        <PublicGuard>
          <PublicLayout>
            <RegisterPage />
          </PublicLayout>
        </PublicGuard>
      ),
      index: true,
    },
    {
      path: "/books",
      element: (
        <PrivateGuard>
          <PrivateLayout>
            <BooksPage />
          </PrivateLayout>
        </PrivateGuard>
      ),
      index: true,
    },
    {
      path: "*",
      element: (
        <PublicGuard>
          <PublicLayout>
            <Error />
          </PublicLayout>
        </PublicGuard>
      ),
    },
  ]);

export default Routers;
