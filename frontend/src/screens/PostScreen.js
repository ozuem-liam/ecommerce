import React from "react";
import axios from "axios";
import { useState } from "react";
import {Link} from 'react-router-dom';

function PostScreen() {
  const [previewSource, setPreviewSource] = useState();
  const [errorMessage, setErrorMessage] = useState({ value: "" });

  const [files, setFiles] = useState([]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFiles([...files, file]);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      const data = {
        name: values.name,
        description: values.description,
        price: values.price,
        countInStock: values.countInStock,
      };
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("countInStock", data.countInStock);
      formData.append("image", files[0]);
      const result = await axios.post(
        "http://127.0.0.1:5000/api/admin/products",
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authorization"),
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload(false);
      if (result) {
        alert("Product successfully added");
      }
    } catch (error) {
      return error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage();
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.pathname = "/admin/login";
  };
  return (
    <div>
      <h1>Upload your products</h1>
      <form encType="multipart/form-data">
        <div className="form-inputs">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="form-input"
            placeholder="Enter product name"
            value={values.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-inputs">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            className="form-input"
            placeholder="Enter product description"
            value={values.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-inputs">
          <label htmlFor="price" className="form-label">
            price
          </label>
          <input
            id="price"
            type="integer"
            name="price"
            className="form-input"
            placeholder="Enter product price"
            value={values.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-inputs">
          <label htmlFor="countInStock" className="form-label">
            count in stock
          </label>
          <input
            id="countInStock"
            type="integer"
            name="countInStock"
            className="form-input"
            placeholder="Enter product count in stock"
            value={values.countInStock}
            onChange={handleChange}
          />
        </div>

        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={files.name}
          className="form-input"
        />

        <button className="btn" type="submit" onClick={handleSubmit}>
          Create
        </button>
      </form>
      {previewSource && (
        <img scr={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
      {errorMessage.value && (
        <p className="text-danger"> {errorMessage.value} </p>
      )}
      <h2>Welcome to the Homepage / Landing page</h2>
      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
      <button><Link to="/admin/products">List all products</Link></button>
    </div>
  );
}

export default PostScreen;
