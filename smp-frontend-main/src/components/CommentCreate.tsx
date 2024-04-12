import React, { useState } from "react";
import { CommentRequest } from "../types/Comment";
import { useUserStore } from "../stores/userStore";
import axios from "../config/axios";
import { toast } from "react-toastify";

type CommentCreateProps = {
  postId: string;
};

const CommentCreate: React.FC<CommentCreateProps> = ({ postId }) => {
  const { user } = useUserStore();
  const initialCommentState: CommentRequest = {
    id: undefined,
    postid: postId,
    userid: user.id,
    content: "",
    commentDate: "",
  };
  const [comment, setComment] = useState<CommentRequest>(initialCommentState);

  const postComment = async () => {
    if (comment.content && comment.userid && comment.postid) {
      try {
        await axios.post(`comments/post/${comment.postid}`, comment);
        setComment(initialCommentState);
      } catch (err) {
        toast.error("❌ Something Went Wrong.");
      }
    } else {
      toast.error("❌ Something Went Wrong.");
    }
  };

  return (
    <div className="flex items-center space-x-4 py-4">
      <input
        type="text"
        placeholder="Enter your comment..."
        className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none"
        value={comment.content}
        onChange={(e) => setComment({ ...comment, content: e.target.value })}
      />

      <button
        className="btn btn-info px-4 py-2 rounded-md"
        onClick={postComment}
      >
        Comment
      </button>
    </div>
  );
};

export default CommentCreate;
