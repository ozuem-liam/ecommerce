import "./LoginScreen.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function LoginScreen() {
  const [adminData, setAdminData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState({ value: "" });
  const history = useHistory();

  // useEffect(() => {
  //   if (localStorage.getItem("admin-info")) {
  //     history.pushState("/admin/product");
  //   }
  // });
  const handleInputChange = (e) => {
    setAdminData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let result = await axios.post("http://127.0.0.1:5000/api/admin/login", adminData);
      //if username or password field is empty, return error message
      if (adminData.email === "" || adminData.password === "") {
        setErrorMessage((prevState) => ({
          value: "Empty username/password field",
          ...prevState,
        }));
      } else if (
        adminData.email === result.data.email &&
        adminData.password === result.data.password
      ) {
        //Signin Success
        localStorage.setItem("authorization", result.data.token);
        window.location.pathname = "/admin/product";
        // history.push("/admin/product");
      } else {
        //If credentials entered is invalid
        setErrorMessage((prevState) => ({
          value: "Invalid username/password",
        }));
      }
    } catch (error) {
      return error;
    }
  }

  return (
    <div className="log-in-box">
      <form>
        <div className="text-box">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="E-mail"
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>
        <br />
        <div className="text-box">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="PASSWORD"
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>
        <br />
        <button type="submit" className="log-in-btn" onClick={handleSubmit}>
          log in
        </button>

        {errorMessage.value && (
          <p className="text-danger"> {errorMessage.value} </p>
        )}
      </form>
    </div>
  );
}

export default LoginScreen;
