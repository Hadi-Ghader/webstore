import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import isEmail from 'validator/lib/isEmail';
import { useNavigate } from "react-router-dom";
import "./MyLogin.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import Cookies from 'js-cookie';

const MyLogin = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [resMessage, setResMessage] = useState("");
  const navigate = useNavigate();

  const submitCreds = () => {
    if(isEmail(email))
      axios.post(`http://localhost:8080/login`, {
      email,
      password
    },{withCredentials: true}).then((res) => {
        Cookies.set("admin", res.data.admin);
        localStorage.setItem("cartProducts", JSON.stringify(res.data.cartProducts));
        setResMessage("");
        navigate("/");
        return res;
    }).catch((error) => {
      setResMessage(error.response.data);
    });
  };

  return (
    <div className="box-login">
      <TextField
        error={isError}
        InputProps={{ style: { color: "black" } }}
        InputLabelProps={{ style: { color: "black" } }}
        className="email"
        label="Enter Your Email"
        variant="outlined"
        onChange={(e) => {
            setEmail(e.target.value);
            if(email !== "") setIsError(!isEmail(e.target.value));
            if(isError) setErrorText("Incorrect Email");
            else setErrorText("");
        }}
        helperText={errorText}/>
      <TextField
        InputProps={{ style: { color: "black" } }}
        InputLabelProps={{ style: { color: "black" } }}
        className="password"
        label="Enter Your Password"
        variant="outlined"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

    {resMessage !== "" && 
      <Typography className="emailNotExists">
        {resMessage}
      </Typography>}

      <Typography className="signUpNow">
        <Link to="/signup">
          Don't have an account already? Sign Up instead!
        </Link>
      </Typography>

      <Button id="btn_login" variant="contained" onClick={submitCreds}>
        Log in
      </Button>
      <Button id="btn_login_cancel" variant="contained" onClick={() => navigate("/")}>
        Cancel
      </Button>
    </div>
  );
};

export default MyLogin;
