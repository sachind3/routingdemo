import { useEffect, useContext } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthState } from "./AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
const Login = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const { currentUser, setCurrentUser, api } = useContext(AuthState);
  useEffect(() => {
    if (currentUser) {
      navigate(from);
    }
  }, [currentUser]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: (val) => {
      getUser(val.email, val.password);
    },
  });

  async function getUser(email, password) {
    try {
      const response = await axios.get(
        `${api}/users?email=${email}&&password=${password}`
      );
      if (response.data[0]) {
        if (response.data[0].active) {
          setCurrentUser(response.data[0]);
          localStorage.setItem("user", JSON.stringify(response.data[0]));
        } else {
          alert("This user is not active");
        }
      } else {
        alert("Wrong credentials");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h4>Login Page</h4>
          <Card className="mt-3">
            <Card.Body>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <>
                      <Form.Text className="text-danger">
                        {formik.errors.email}
                      </Form.Text>
                    </>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <>
                      <Form.Text className="text-danger">
                        {formik.errors.password}
                      </Form.Text>
                    </>
                  )}
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
