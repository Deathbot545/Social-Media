import React, { useEffect, useState } from "react";
import { PostResponse } from "../types/Post";
import SingleComment from "./SingleComment.tsx";
import CommentCreate from "./CommentCreate.tsx";
import { CommentResponse } from "../types/Comment.ts";
import axios from "../config/axios";
import { useUserStore } from "../stores/userStore.ts";
import { toast } from "react-toastify";

type SinglePostProps = {
  post: PostResponse;
};

const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
  const { user } = useUserStore();
  const [allComments, setAllComments] = useState<CommentResponse[]>([]);
  const [commentsVisible, setCommentsVisible] = useState<boolean>(false);

  const getAllCommentsOfPost = async () => {
    const res = await axios.get(`comments/post/${post.postId}`);
    setAllComments(res.data);
  };

  const deletePost = async () => {
    try {
      await axios.delete(`posts/delete/${post.postId}`);
      toast.success("✅ Post Deleted.");
    } catch (err) {
      console.error(err);
      toast.error("❌ Something Went Wrong.");
    }
  };

  useEffect(() => {
    getAllCommentsOfPost();
    const intervalId = setInterval(getAllCommentsOfPost, 10000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="relative p-4 shadow-md shadow-base-300 border border-base-300 rounded-md mb-4">
      <div className="flex items-center mb-4">
        <img
          src={post.userImgURL}
          alt={`${"Chamindu Vidyarathne"}'s profile`}
          className="w-8 h-8 rounded-full object-cover mr-2"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-info">
            {`${post.userFirstname} ${post.userLastname}`}
          </span>
          <span className="font-semibold text-gray-500">
            {`Posted on ${post.postDate}`}
          </span>
        </div>
      </div>

      {user.firstname === post.userFirstname && (
        <p
          onClick={deletePost}
          className="absolute right-5 top-10 font-bold select-none cursor-pointer hover:underline  bg-base-100 p-1 rounded-bl-lg bg-opacity-80"
        >
          Delete
        </p>
      )}

      <p className="mb-4 text-secondary-content">{post.postText}</p>
      {post.postImgURL && (
        <img
          src={post.postImgURL}
          alt="Post"
          className="w-[720px] h-[720px] object-cover mb-4 rounded-md"
        />
      )}

      <div className="flex justify-end">
        <button
          className=" hover:underline"
          onClick={() => setCommentsVisible((prev) => !prev)}
        >
          {commentsVisible ? "Hide Comments" : "View Comments"}
        </button>
      </div>

      <div>
        {allComments.length > 0 ? (
          <div
            className={`${commentsVisible ? "h-[300px] overflow-y-scroll" : "h-0 overflow-y-hidden"} duration-500 flex flex-col gap-2 items-start justify-start`}
          >
            {allComments.map((comment: CommentResponse) => (
              <SingleComment comment={comment} key={comment.commentId} />
            ))}
          </div>
        ) : (
          <></>
        )}
        <CommentCreate postId={post.postId} />
      </div>
    </div>
  );
};

export default SinglePost;
