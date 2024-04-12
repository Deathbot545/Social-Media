import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { useStatusStore } from "../stores/statusStore";
import { useUserStore } from "../stores/userStore";
import { initialStateStatusReq } from "../stores/statusStore";
import { toast } from "react-toastify";

const StatusCreate: React.FC = () => {
  const { user } = useUserStore();
  const { reqStatus, setReqStatus } = useStatusStore();

  useEffect(() => {
    setReqStatus({ ...reqStatus, userid: user.id });
  }, [user]);

  const handleChange = (value: string, key: string) => {
    setReqStatus({ ...reqStatus, [key]: value });
  };

  const createStatus = async (e: any) => {
    e.preventDefault();

    try {
      await axios.post("status/", reqStatus);
      toast.success("✅ Status Created.");
      setReqStatus({ ...initialStateStatusReq, userid: user.id });
      setShowModal(false);
    } catch (err) {
      toast.error("❌ Something Went Wrong.");
      console.error(err);
    }
  };

  const [showModal, setShowModal] = useState(false);
  return (
    <div className="relative min-w-44 min-h-64 flex justify-center border border-base-content items-center rounded-lg cursor-pointer z-50">
      <div
        onClick={() => setShowModal(true)}
        className="text-4xl w-12 h-12 rounded-full border border-dashed text-center cursor-pointer"
      >
        +
      </div>
      {showModal && (
        <div
          className={`fixed inset-0 flex justify-center items-center bg-info-content bg-opacity-50`}
        >
          <div
            className={`p-4 rounded-lg border border-base-content bg-base-200 bg-opacity-80 modal-animation ${showModal ? "open" : "close"}`}
          >
            <input
              type="text"
              placeholder="Enter Image URL"
              value={reqStatus.imgURL}
              onChange={(e) => handleChange(e.target.value, "imgURL")}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <button
              onClick={createStatus}
              className="btn btn-active btn-ghost hover:bg-base-content text-white px-4 py-2 rounded-md"
            >
              Create
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="ml-2 text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusCreate;
