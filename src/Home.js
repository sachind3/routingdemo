import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { AuthState } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { allBlogs } = useContext(AuthState);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = allBlogs.filter((blog) => {
      return blog.isActive === true;
    });
    setBlogs(getBlogs);
  }, [allBlogs]);

  return (
    <div>
      <h4>All Articles</h4>
      <Row xs={1} md={2} lg={3} className="g-4">
        {blogs.length &&
          blogs.map((blog) => {
            return (
              <Col
                key={blog.blogId}
                onClick={() => navigate(`/blog/${blog.blogId}`)}
              >
                <Card>
                  <Card.Img
                    variant="top"
                    src="https://via.placeholder.com/480x270/000000/ffffff"
                  />
                  <Card.Body>
                    <Card.Title>{blog.blogTitle}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Home;
