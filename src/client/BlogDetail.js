import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthState } from "../AuthContext";

const BlogDetail = () => {
  const { allBlogs } = useContext(AuthState);
  const [blogDetail, setBlogDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const currentBlog = allBlogs.find((blog) => {
      return blog.blogId === id;
    });
    console.log(currentBlog);
    setBlogDetail(currentBlog);
  }, [allBlogs, id]);
  if (!blogDetail) {
    return "loading";
  } else {
    console.log(blogDetail);
    return (
      <div>
        <h4>{blogDetail.blogTitle}</h4>
        <div dangerouslySetInnerHTML={{ __html: blogDetail.blogDescription }} />
      </div>
    );
  }
};

export default BlogDetail;
