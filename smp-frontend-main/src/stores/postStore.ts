import { create } from "zustand";
import { PostRequest, PostResponse } from "../types/Post";

interface PostState {
  allPosts: PostResponse[];
  reqPost: PostRequest;
  setReqPost: (p: PostRequest) => void;
  setAllPosts: (posts: PostResponse[]) => void;
}

export const initialStatePostReq: PostRequest = {
  id: undefined,
  userid: "",
  text: "",
  imgURL: "",
  postDate: "",
};

export const initialStatePostRes: PostResponse = {
  postId: "",
  postText: "",
  postImgURL: "",
  postDate: "",
  userFirstname: "",
  userLastname: "",
  userImgURL: "",
};

export const usePostStore = create<PostState>()((set) => ({
  allPosts: [],
  reqPost: initialStatePostReq,
  setReqPost: (p) => set(() => ({ reqPost: p })),
  setAllPosts: (posts) => set(() => ({ allPosts: posts })),
}));
