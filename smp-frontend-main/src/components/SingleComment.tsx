import React from "react";
import { CommentResponse } from "../types/Comment";
import { useUserStore } from "../stores/userStore";
import axios from "../config/axios";
import { toast } from "react-toastify";

type SingleCommentProps = {
  comment: CommentResponse;
};

const SingleComment: React.FC<SingleCommentProps> = ({ comment }) => {
  const { user } = useUserStore();

  const deleteComment = async () => {
    try {
      await axios.delete(`comments/delete/${comment.commentId}`);
      toast.success("✅ Comment Deleted.");
    } catch (err) {
      toast.error("❌ Something Went Wrong.");
      console.error(err);
    }
  };

  return (
    <div className="flex bg-base-200 items-start space-x-4 p-4 w-full rounded-lg">
      <img
        src={comment.userImgURL}
        alt={comment.userFirstname}
        className="w-10 h-10 rounded-full object-cover mt-2"
      />

      <div className="flex flex-col">
        <div className="font-semibold">{`${comment.userFirstname} ${comment.userLastname}`}</div>

        <div className="bg-base-300 p-2 rounded-md text-primary">
          {comment.commentContent}
        </div>

        <div className="flex gap-2">
          <div className="text-sm text-gray-500 mt-1">
            {comment.commentDate}
          </div>
          {comment.userId === user.id && (
            <span
              className="text-sm text-gray-500 hover:underline mt-1 cursor-pointer"
              onClick={deleteComment}
            >
              Delete
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
