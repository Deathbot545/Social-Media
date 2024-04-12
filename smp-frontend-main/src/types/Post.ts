export type PostResponse = {
  postId: string;
  postText: string;
  postImgURL: string;
  postDate: string;
  userFirstname: string;
  userLastname: string;
  userImgURL: string;
};

export type PostRequest = {
  id: string | undefined;
  userid: string | undefined;
  text: string;
  imgURL: string;
  postDate: string;
};
