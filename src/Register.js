import { useContext, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthState } from "./AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Register = () => {
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: (val) => {
      if (!currentUser) {
        setUser(val.firstName, val.lastName, val.email, val.password);
      }
    },
  });

  async function setUser(firstName, lastName, email, password) {
    let postData = {
      firstName,
      lastName,
      email,
      password,
      token: new Date().getTime().toString(),
    };
    await axios
      .get(`${api}/users?email=${email}`)
      .then((res) => {
        if (res.data[0]) {
          alert("This email is already exist");
        } else {
          axios
            .post(`${api}/users`, postData)
            .then((res) => {
              console.log(res);
              setCurrentUser(postData);
              localStorage.setItem("user", JSON.stringify(postData));
              navigate(from);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h4>Register Page</h4>
          <Card className="mt-3">
            <Card.Body>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    placeholder="Enter first name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <>
                      <Form.Text className="text-danger">
                        {formik.errors.firstName}
                      </Form.Text>
                    </>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    placeholder="Enter first name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <>
                      <Form.Text className="text-danger">
                        {formik.errors.lastName}
                      </Form.Text>
                    </>
                  )}
                </Form.Group>
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

export default Register;
