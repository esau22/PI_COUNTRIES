import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

const regexEightDigitInteger = /^\d{0,8}$/;
const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,10}/;

export default function LandingPage({ login }) {
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
  });
  const [inputsErrors, setInputsErrors] = useState({
    id: "",
    password: "",
  });

  const navigate = useNavigate();

  const validate = (inputs) => {
    const errors = {};
    if (!inputs.id) errors.id = "ID is null";
    if (inputs.id.length > 8) errors.id = "ID must contain 8 characters";
    if (!regexEightDigitInteger.test(inputs.id))
      errors.id = "ID must be numeric";

    if (!regexPassword.test(inputs.password)) {
      errors.password = "Password ... ";
    }
    if (inputs.password.length < 6) {
      errors.password = "Password must contain at least 6 characters";
    }
    if (!inputs.password) {
      errors.password = "Password is null";
    }
    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "id" && !isNaN(value) && value.length <= 8) {
      setInputs({
        ...inputs,
        [name]: value,
      });
    } else if (name === "password") {
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
    setInputsErrors(
      validate({
        ...inputs,
        [name]: value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const aux = Object.keys(inputsErrors);
    if (aux.length === 0) {
      // TODO: Tomar los inputs y enviarlos a POST

      setInputsErrors({
        id: "",
        password: "",
      });
      login(inputs);
      setInputs({
        id: "",
        password: "",
      });

      navigate("/home");
    } else {
      alert("Error");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar Sesion</h1>
        <div className="inputs">
          <label>Id: </label>
          <input
            type="tel"
            key="id"
            name="id"
            value={inputs.id}
            onChange={handleChange}
          />
          <span>
            {inputs.id.length > 8
              ? "ID must contain 8 characters"
              : inputsErrors?.id && inputsErrors.id}
          </span>
          <hr />
          <label>Password: </label>
          <input
            type="password"
            key="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
          ></input>
          <span>{inputsErrors?.password && inputsErrors.password}</span>
        </div>
        <hr />
        {Object.keys(inputsErrors).length === 0 ? (
          <button type="submit">Login</button>
        ) : null}
        <Link to="/home">
          <br />
          <button>Login</button>
        </Link>
      </form>
    </div>
  );
}
