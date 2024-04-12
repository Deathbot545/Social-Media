import React from "react";
import { useUserStore } from "../stores/userStore";
import { User } from "../types/User";

const ContactSection: React.FC = () => {
  const { allUsers } = useUserStore();

  return (
    <section className="p-4">
      {allUsers.map((user) => (
        <Contact key={user.id} user={user} />
      ))}
    </section>
  );
};

type ContactProps = {
  user: User;
};

const Contact: React.FC<ContactProps> = ({ user }) => {
  return (
    <div className="flex items-center p-4 w-full border-b border-gray-300">
      <div className="mr-4 relative">
        <img
          src={user.imageURL}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div
          className={`w-4 h-4 ${user.active ? "bg-green-500" : "bg-gray-500"} rounded-full absolute bottom-0 right-0 border-2 border-white`}
        ></div>
      </div>

      <div>
        <h2 className="text-lg font-semibold">{`${user.firstname} ${user.lastname}`}</h2>
        {user.active && <p className="text-green-500">Active now</p>}
      </div>
    </div>
  );
};

export default ContactSection;
