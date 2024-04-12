import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { useUserStore } from "../stores/userStore";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const handleChange = (value: string, key: string) => {
    setUser({ ...user, [key]: value });
  };

  const loginUser = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.get(`users/login/${user.email}`);

      let loggedUser = res.data;

      if (!res.data.email) {
        toast.error("❌ Email is incorrect.");
      } else {
        if (res.data.password === user.password) {
          localStorage.setItem("user", JSON.stringify(loggedUser));
          setUser({ ...loggedUser, active: true });
          toast.success("✅ Login Success.");
          navigate("/");
        } else {
          toast.error("❌ Password is incorrect.");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Something Went Wrong.");
    }
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md rounded-lg shadow-md p-8 border">
        <div className="text-2xl font-semibold text-center mb-6 flex flex-col items-center justify-center">
          <p>Log In to</p> <img src={logo} className="w-[300px]" />
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your email"
              required
              onChange={(e) => handleChange(e.target.value, "email")}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your password"
              required
              onChange={(e) => handleChange(e.target.value, "password")}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg btn btn-outline font-medium text-center "
            onClickCapture={(e) => loginUser(e)}
          >
            Log In
          </button>
          <Link
            to="/forgot-password"
            className="block pt-4 text-center text-sm text-gray-500 hover:underline"
          >
            Forgot password?
          </Link>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Create a new account{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
