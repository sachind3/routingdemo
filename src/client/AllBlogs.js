import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Form, Table } from "react-bootstrap";
import { AuthState } from "../AuthContext";

const AllBlogs = () => {
  const { allBlogs, currentUser, onSwitchAction } = useContext(AuthState);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const userBlogs = allBlogs.filter((blog) => {
      return blog.blogAuther === currentUser.token;
    });
    setBlogs(userBlogs);
  }, [allBlogs, currentUser.token]);

  return (
    <>
      <h4>All blogs</h4>
      {blogs.length ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Date</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => {
              return (
                <tr key={blog.blogId}>
                  <td>{index + 1}</td>
                  <td>{blog.blogTitle}</td>
                  <td>{blog.blogDate}</td>
                  <td>
                    {
                      <Form.Check
                        type="switch"
                        onChange={() => onSwitchAction(blog)}
                        id={blog.blogId}
                        checked={blog.isActive}
                      />
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        "no data"
      )}
    </>
  );
};

export default AllBlogs;
