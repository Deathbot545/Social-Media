import ThemeController from "./components/ThemeController.tsx";
import LoginPage from "./components/LoginPage.tsx";
import SignupPage from "./components/SignupPage.tsx";
import ProfileRedirector from "./components/ProfileRedirector.tsx";
import Profile from "./components/Profile.tsx";
import FeedPage from "./components/FeedPage.tsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useUserStore } from "./stores/userStore.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/profile/feed" />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/profile",
    element: <ProfileRedirector></ProfileRedirector>,
    children: [
      {
        path: "/profile/:userId",
        element: <Profile />,
      },
      {
        path: "/profile/feed",
        element: <FeedPage />,
      },
    ],
  },
]);

function App() {
  const { setUser } = useUserStore();
  useEffect(() => {
    const resUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (resUser.id && resUser.id !== "") {
      setUser(resUser);
    }
  }, []);
  return (
    <>
      <ThemeController />
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
