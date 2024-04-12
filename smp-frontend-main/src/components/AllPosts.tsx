import React, { useEffect } from "react";
import SinglePost from "./SinglePost";
import axios from "../config/axios";
import { usePostStore } from "../stores/postStore";

const AllPosts: React.FC = () => {
  const { allPosts, setAllPosts } = usePostStore();

  const getAllPosts = async () => {
    const res = await axios.get("posts/");
    setAllPosts(res.data);
  };

  useEffect(() => {
    getAllPosts();

    const intervalId = setInterval(getAllPosts, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="mt-4">
      {allPosts.map((post) => (
        <SinglePost post={post} key={post.postId} />
      ))}
    </section>
  );
};

export default AllPosts;
