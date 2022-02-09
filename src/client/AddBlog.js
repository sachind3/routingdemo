import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthState } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

const AddBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  const navigate = useNavigate();
  const { postBlog } = useContext(AuthState);
  const formik = useFormik({
    initialValues: {
      blogTitle: "",
    },
    validationSchema: Yup.object({
      blogTitle: Yup.string().required(),
    }),
    onSubmit: (val) => {
      postBlog(val.blogTitle, content);
      formik.resetForm();
      navigate("/all-blogs");
    },
  });

  return (
    <>
      <h4>Add New Blog</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="blogTitle">
          <Form.Label>Blog Title</Form.Label>
          <Form.Control
            placeholder="Enter blog title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.blogTitle}
          />
          {formik.touched.blogTitle && formik.errors.blogTitle ? (
            <Form.Text>{formik.errors.blogTitle}</Form.Text>
          ) : null}
        </Form.Group>
        <div className="mb-3">
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
          {content}
        </div>

        <Button
          variant="primary"
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddBlog;
