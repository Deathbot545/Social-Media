import React, { useEffect } from "react";
import { usePostStore, initialStatePostReq } from "../stores/postStore";
import { useUserStore } from "../stores/userStore";
import axios from "../config/axios";
import { toast } from "react-toastify";

const PostCreate: React.FC = () => {
  const { user } = useUserStore();
  const { reqPost, setReqPost } = usePostStore();

  useEffect(() => {
    setReqPost({ ...reqPost, userid: user.id });
  }, [user]);

  const handleChange = (value: string, key: string) => {
    setReqPost({ ...reqPost, [key]: value });
  };

  const createPost = async (e: any) => {
    e.preventDefault();

    try {
      await axios.post("posts/", reqPost);
      toast.success("✅ Post Created.");
      setReqPost(initialStatePostReq);
    } catch (err) {
      toast.error("❌ Something Went Wrong.");
      console.error(err);
    }
  };

  return (
    <div className=" p-4 rounded-lg shadow-md border border-base-content">
      <h2 className="text-xl font-semibold mb-4">Create Post</h2>
      <form>
        <textarea
          className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none mb-4"
          placeholder="What's on your mind?"
          value={reqPost.text}
          onChange={(e) => handleChange(e.target.value, "text")}
        ></textarea>

        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Enter Image URL"
          value={reqPost.imgURL}
          onChange={(e) => handleChange(e.target.value, "imgURL")}
        />

        <div className="flex justify-end">
          <button
            type="button"
            className="btn btn-active btn-ghost text-white px-4 py-2 rounded-md hover:bg-base-content"
            onClick={(e) => createPost(e)}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
