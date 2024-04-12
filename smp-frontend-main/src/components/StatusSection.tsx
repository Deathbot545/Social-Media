import React, { useEffect } from "react";
import SingleStatus from "./SingleStatus.tsx";
import StatusCreate from "./StatusCreate.tsx";
import "../styles/Scrollbar.css";
import { useStatusStore } from "../stores/statusStore.ts";
import axios from "../config/axios";
import "../styles/Animations.css";

const StatusSection: React.FC = () => {
  const { allStatus, setAllStatus } = useStatusStore();

  const getAllStatus = async () => {
    const res = await axios.get("status/");
    setAllStatus(res.data);
  };

  useEffect(() => {
    getAllStatus();

    const intervalId = setInterval(getAllStatus, 10000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="overflow-x-scroll mb-4">
      <div className="flex space-x-4 py-4 overflow-x-auto flex-nowrap">
        <StatusCreate />
        {allStatus.map((status) => (
          <SingleStatus status={status} key={status.statusId} />
        ))}
      </div>
    </div>
  );
};

export default StatusSection;
