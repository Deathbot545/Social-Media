import { create } from "zustand";
import { StatusRequest, StatusResponse } from "../types/Status";

interface StatusState {
  allStatus: StatusResponse[];
  reqStatus: StatusRequest;
  setReqStatus: (s: StatusRequest) => void;
  setAllStatus: (pstatus: StatusResponse[]) => void;
}

export const initialStateStatusReq: StatusRequest = {
  id: undefined,
  userid: "",
  imgURL: "",
};

export const initialStateStatusRes: StatusResponse = {
  statusId: "",
  statusImgURL: "",
  statusTime: "",
  userFirstname: "",
  userImgURL: "",
};

export const useStatusStore = create<StatusState>()((set) => ({
  allStatus: [],
  reqStatus: initialStateStatusReq,
  setReqStatus: (s) => set(() => ({ reqStatus: s })),
  setAllStatus: (pstatus) => set(() => ({ allStatus: pstatus })),
}));
