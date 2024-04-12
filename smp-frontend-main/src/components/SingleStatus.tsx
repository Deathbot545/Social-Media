import React from "react";
import { StatusResponse } from "../types/Status";
import { useUserStore } from "../stores/userStore";
import axios from "../config/axios";
import { toast } from "react-toastify";

type SingleStatusProps = {
  status: StatusResponse;
};

const SingleStatus: React.FC<SingleStatusProps> = ({ status }) => {
  const { user } = useUserStore();

  const deleteStatus = async () => {
    try {
      await axios.delete(`status/delete/${status.statusId}`);
      toast.success("✅ Status Deleted.");
    } catch (err) {
      toast.error("❌ Something Went Wrong.");
      console.error(err);
    }
  };

  return (
    <div className="border border-base-content relative min-w-44 max-w-44 min-h-64 bg-gray-200 rounded-lg overflow-hidden">
      <img
        src={status.statusImgURL}
        alt="Status Image"
        className="w-full h-full object-cover"
      />

      <p className="font-bold absolute top-0 bg-base-100 p-1 rounded-br-lg bg-opacity-80">
        {status.statusTime}
      </p>
      {user.firstname === status.userFirstname && (
        <p
          onClick={deleteStatus}
          className="font-bold select-none cursor-pointer hover:underline absolute top-0 right-0 bg-base-100 p-1 rounded-bl-lg bg-opacity-80"
        >
          Delete
        </p>
      )}
      <div className="absolute bottom-2 left-2 flex text-primary items-center gap-2 bg-base-300 w-full px-2 py-1 rounded-lg">
        <img
          src={status.userImgURL}
          alt={status.userFirstname}
          className="w-10 h-10 rounded-full border-2 border-info"
        />
        <p className="font-cursive">{status.userFirstname}</p>
      </div>
    </div>
  );
};

export default SingleStatus;
