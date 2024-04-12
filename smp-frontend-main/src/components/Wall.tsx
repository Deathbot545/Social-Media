import React from "react";
import PostCreate from "./PostCreate.tsx";
import AllPosts from "./AllPosts.tsx";
import StatusSection from "./StatusSection.tsx";

const Wall: React.FC = () => {
  return (
    <section className="max-w-[720px] h-screen mx-auto py-4">
      <StatusSection />
      <PostCreate />
      <AllPosts />
    </section>
  );
};

export default Wall;
