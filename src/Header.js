import { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthState } from "./AuthContext";

const Header = () => {
  let navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthState);

  const logoutHandler = () => {
    if (currentUser) {
      setCurrentUser(null);
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            {currentUser && (
              <>
                <Nav.Link as={NavLink} to="/all-blogs">
                  All Blogs
                </Nav.Link>
                <Nav.Link as={NavLink} to="/add-blog">
                  Add Blog
                </Nav.Link>
                <Nav.Link as={NavLink} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link as={NavLink} to="/contact">
                  Contact
                </Nav.Link>
                <Nav.Link as={NavLink} to="/dashboard">
                  Admin Page
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav style={{ alignItems: "center" }}>
            {currentUser ? (
              <>
                <Navbar.Text
                  className="me-2"
                  style={{ textTransform: "capitalize" }}
                >
                  Welcome, {currentUser.firstName} {currentUser.lastName}
                </Navbar.Text>
                <Nav.Link
                  as={Button}
                  type="button"
                  size="sm"
                  onClick={logoutHandler}
                  style={{ paddingTop: "0.25rem", paddingBottom: "0.25rem" }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
