import React, { useEffect, useState } from "react";
import { initialState, useUserStore } from "../stores/userStore";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "../config/axios";
import { toast } from "react-toastify";

const Profile: React.FC = () => {
  const { user, setUser } = useUserStore();
  const param = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newImageURL, setNewImageURL] = useState("");

  const handleChangeProfilePicture = async (e: any) => {
    e.preventDefault();

    setUser({ ...user, imageURL: newImageURL });

    try {
      await axios.post(`users/update`, {
        ...user,
        imageURL: newImageURL,
      });
      toast.success("✅ Success.");
    } catch (err) {
      toast.error("❌ Failed.");
      console.log(err);
    }

    try {
      const resUser = await axios.get(`users/${user.id}`);
      const data = JSON.stringify(resUser.data);
      localStorage.setItem("user", data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePassword = async (e: any) => {
    e.preventDefault();

    if (newPassword && currentPassword) {
      if (user.password === currentPassword) {
        try {
          navigate("/");
          localStorage.removeItem("user");
          await axios.post(`users/update`, {
            ...user,
            active: false,
            password: newPassword,
          });
          setUser(initialState);
          toast.success("✅ Success. Please Login Again.");
        } catch (err) {
          console.log(err);
        }
      } else {
        toast.error("❌ Current Password is False.");
      }
    } else {
      toast.error("❌ Please enter all values.");
    }

    setCurrentPassword("");
    setNewPassword("");
  };

  useEffect(() => {
    if (user.firstname === "") {
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (currentUser.id !== param.userId) {
        console.log("Something went wrong. Redirecting to login page...");
        if (currentUser.id) {
          localStorage.removeItem("user");
        }
        navigate("/");
      } else {
        setUser(JSON.parse(localStorage.getItem("user") || "{}"));
      }
    }
  }, []);

  return (
    <div>
      <Navbar />
      <main className="max-w-max mx-auto py-4">
        <h1 className="font-semibold text-4xl">Hi,</h1>
        <h1 className="font-bold text-info font-cursive text-[72px]">{`${user.firstname} ${user.lastname}`}</h1>
        <div className="max-w-md mt-8 border p-4 border-base-content rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Change Profile Picture</h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="newImageURL"
                className="block font-medium text-gray-700"
              >
                New Image URL
              </label>
              <input
                type="text"
                id="newImageURL"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={newImageURL}
                onChange={(e) => setNewImageURL(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={(e) => handleChangeProfilePicture(e)}
            >
              Change Profile Picture
            </button>
          </form>
        </div>
        <div className="max-w-md mt-8 border p-4 border-base-content rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={(e) => handleChangePassword(e)}
            >
              Change Password
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
