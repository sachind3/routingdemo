import React, { useContext, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthState } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const { currentUser, deleteUser } = useContext(AuthState);

  const formik = useFormik({
    initialValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      email: Yup.string().email().required(),
    }),
    onSubmit: (val) => {
      formik.resetForm();
      navigate("/all-blogs");
    },
  });

  const deleteFormik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required(),
    }),
    onSubmit: (val) => {
      console.log(val);
      if (val.password !== currentUser.password) {
        alert("wrong password");
        deleteFormik.resetForm();
      } else {
        deleteUser();
        deleteFormik.resetForm();
      }
    },
  });
  return (
    <>
      <div>
        <h4>Your profile</h4>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              placeholder="Enter your first name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <Form.Text>{formik.errors.firstName}</Form.Text>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              placeholder="Enter your last name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <Form.Text>{formik.errors.lastName}</Form.Text>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              disabled
            />
            {formik.touched.email && formik.errors.email ? (
              <Form.Text>{formik.errors.email}</Form.Text>
            ) : null}
          </Form.Group>
          <Stack direction="horizontal" gap={3}>
            <Button
              variant="primary"
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Submit
            </Button>
            <Button type="button" variant="danger" onClick={handleShow}>
              Delete Account
            </Button>
          </Stack>
        </Form>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Form onSubmit={deleteFormik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Enter your password</Form.Label>
              <Form.Control
                placeholder="Enter your password"
                onChange={deleteFormik.handleChange}
                onBlur={deleteFormik.handleBlur}
                value={deleteFormik.values.password}
              />
              {deleteFormik.touched.password && deleteFormik.errors.password ? (
                <Form.Text>{deleteFormik.errors.password}</Form.Text>
              ) : null}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="danger"
              type="submit"
              disabled={!(deleteFormik.isValid && deleteFormik.dirty)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Profile;
