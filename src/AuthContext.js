import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";

const api = "http://localhost:3004";

const AuthState = createContext();

const AuthContext = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [setCurrentUser]);

  const onSwitchAction = async (blog) => {
    axios
      .put(`${api}/blogs/${blog.id}`, {
        ...blog,
        isActive: !blog.isActive,
      })
      .then(() => {
        getAllBlogs();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  async function postBlog(blogTitle, blogDescription) {
    axios
      .post(`${api}/blogs`, {
        blogAuther: currentUser.token,
        blogTitle,
        blogDescription,
        blogDate: new Date(),
        blogId: new Date().getTime().toString() + currentUser.token,
        isActive: true,
      })
      .then(() => {
        // console.log(res);
        getAllBlogs();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function deleteUser() {
    axios
      .put(`${api}/users/${currentUser.id}`, {
        ...currentUser,
        active: false,
      })
      .then(() => {
        if (currentUser) {
          setCurrentUser(null);
          localStorage.removeItem("user");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getAllBlogs();
  }, []);

  async function getAllBlogs() {
    try {
      const response = await axios.get(`${api}/blogs`);
      if (response.data[0]) {
        setAllBlogs(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const store = {
    currentUser,
    setCurrentUser,
    allBlogs,
    setAllBlogs,
    api,
    postBlog,
    deleteUser,
    onSwitchAction,
  };
  return (
    <AuthState.Provider value={store}>{props.children}</AuthState.Provider>
  );
};

export { AuthState, AuthContext };
