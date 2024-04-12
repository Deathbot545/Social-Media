export type CommentRequest = {
  id: string | undefined;
  postid: string | undefined;
  userid: string | undefined;
  content: string;
  commentDate: string;
};

export type CommentResponse = {
  commentId: string;
  commentContent: string;
  commentDate: string;
  postId: string;
  userId: string;
  userFirstname: string;
  userLastname: string;
  userImgURL: string;
};
