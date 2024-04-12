import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import ContactSection from "./ContactSection.tsx";
import axios from "../config/axios";
import Navbar from "./Navbar.tsx";
import ShortcutSection from "./ShorcutSection.tsx";
import Wall from "./Wall.tsx";
import { toast } from "react-toastify";
import "../styles/Scrollbar.css";

const FeedPage: React.FC = () => {
  const { user, setUser, setAllUsers } = useUserStore();
  const resUser = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const setUserActive = async () => {
    if (user.firstname) {
      try {
        await axios.post(`users/update`, {
          ...user,
          active: true,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getAllUsers = async () => {
    const res = await axios.get("users");
    setAllUsers(res.data);
  };

  useEffect(() => {
    if (user.firstname === "") {
      if (resUser.id && resUser.id !== "") {
        setUser(resUser);
      } else {
        toast.error("❌ Something Went Wrong. Please Login again.");
        if (resUser.id) {
          localStorage.removeItem("user");
        }
        navigate("/");
        return;
      }
    }
  }, []);

  useEffect(() => {
    setUserActive();
  }, []);

  useEffect(() => {
    getAllUsers();

    const intervalId = setInterval(getAllUsers, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Navbar />
      <main className="flex ">
        <section
          id="shortcuts"
          className="h-[89vh] basis-1/6 overflow-y-scroll bg-base-300 "
        >
          <ShortcutSection />
        </section>
        <section id="wall" className="h-[89vh] basis-7/12 overflow-y-scroll">
          <Wall />
        </section>
        <section
          id="contacts"
          className="h-[89vh] basis-3/12 overflow-y-scroll border-l "
        >
          <ContactSection />
        </section>
      </main>
    </div>
  );
};

export default FeedPage;
