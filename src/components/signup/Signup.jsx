import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [resCode, setResCode] = useState("");
  const [emptyField, setEmptyField] = useState(false);
  const navigate = useNavigate();

  const submitCreds = () => {
    if (isEmail(email))
      axios
        .post(
          `http://localhost:8080/signup`,
          {
            email,
            password,
            name,
            address,
          },
          { withCredentials: true }
        )
        .then((res) => {
          setResCode("");
          navigate("/");
          return res;
        })
        .catch((error) => setResCode(error.response.status));
  };

  return (
    <div className="box">
      <TextField
        error={isError}
        InputProps={{ style: { color: "black" } }}
        InputLabelProps={{ style: { color: "black" } }}
        className="email"
        label="Enter Your Email"
        variant="outlined"
        onChange={(e) => {
          setEmail(e.target.value);
          if (email !== "") setIsError(!isEmail(e.target.value));
          if (isError) setErrorText("Incorrect Email");
          else setErrorText("");
        }}
        helperText={errorText}
        required
      />
      <TextField
        InputProps={{ style: { color: "black" } }}
        InputLabelProps={{ style: { color: "black" } }}
        className="password"
        label="Enter Your Password"
        variant="outlined"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <TextField
        InputProps={{ style: { color: "black" } }}
        InputLabelProps={{ style: { color: "black" } }}
        className="name"
        label="Enter Your Name"
        variant="outlined"
        type="text"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        InputProps={{ style: { color: "black" } }}
        InputLabelProps={{ style: { color: "black" } }}
        className="address"
        label="Enter Your Address"
        variant="outlined"
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      {resCode === 409 && (
        <Typography className="emailExists">
          Account already exists! Try logging in instead.
        </Typography>
      )}

      {resCode === 400 && (
        <Typography className="emailExists">
          Please Fill Out All Fields.
        </Typography>
      ) }
        {emptyField && (
          <Typography className="emptyField">
            Please Fill Out All Fields.
          </Typography>
        )
      }

      <Typography className="loginText">
        <Link to="/login">
          Already have an account? Click here to Login in.
        </Link>
      </Typography>
      <Button
        id="btn_signup"
        variant="contained"
        onClick={() => {
          if (
            email === "" ||
            password === "" ||
            address === "" ||
            name === ""
          ) {
            setEmptyField(true);
          } else {
            submitCreds();
          }
        }}
      >
        Sign Up
      </Button>
      <Button id="btn_cancel" variant="contained" onClick={() => navigate("/")}>
        Cancel
      </Button>
    </div>
  );
};

export default SignUp;
