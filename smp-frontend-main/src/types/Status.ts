export type StatusResponse = {
  statusId: string;
  statusImgURL: string;
  statusTime: string;
  userFirstname: string;
  userImgURL: string;
};

export type StatusRequest = {
  id: string | undefined;
  userid: string | undefined;
  imgURL: string;
};
