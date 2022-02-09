import { Container } from "react-bootstrap";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Contact from "./Contact";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import ProtecteRoute from "./ProtecteRoute";
import Layout from "./Layout";
import DashBoard from "./admin/DashBoard";
import Unauthorized from "./Unauthorized";
import AddBlog from "./client/AddBlog";
import AllBlogs from "./client/AllBlogs";
import BlogDetail from "./client/BlogDetail";

const App = () => {
  const NoPageFound = () => {
    return <div>page not found</div>;
  };
  const UnkownRouteHandler = ({ to }) => {
    const prevRoute = useLocation();
    return <Navigate to={to} state={{ prevRoute }} replace />;
  };
  return (
    <>
      <Header />
      <section className="py-4">
        <Container>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/blog/:id" element={<BlogDetail />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="register" element={<Register />}></Route>
              <Route path="unauthorized" element={<Unauthorized />} />

              <Route
                element={<ProtecteRoute allowedRoles={["user", "admin"]} />}
              >
                <Route path="all-blogs" element={<AllBlogs />} />
              </Route>
              <Route
                element={<ProtecteRoute allowedRoles={["user", "admin"]} />}
              >
                <Route path="add-blog" element={<AddBlog />} />
              </Route>
              <Route
                element={<ProtecteRoute allowedRoles={["user", "admin"]} />}
              >
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route
                element={<ProtecteRoute allowedRoles={["user", "admin"]} />}
              >
                <Route path="contact" element={<Contact />} />
              </Route>
              <Route element={<ProtecteRoute allowedRoles={["admin"]} />}>
                <Route path="dashboard" element={<DashBoard />} />
              </Route>
              <Route path="404" element={<NoPageFound />} />
              <Route path="*" element={<UnkownRouteHandler to="/404" />} />
            </Route>
          </Routes>
        </Container>
      </section>
    </>
  );
};

export default App;
