import { Grid, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BgImage from "./../Images/LoginBg.png";
import { user } from "./../Actions";
import Cookie from "js-cookie";
import { cook } from "react-cookie";
import { getCookies } from "cookies-next";
import "./../Styles/login.css";

function Settings(props) {
  const dispach = useDispatch();
  document.title = "Dashboard";
  const [alert, setAlert] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorType, setErrorType] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  function MyAlert() {
    if (alert) {
      if (errorType == "iemail") {
        return <span className="invalid">Not a valid email!</span>;
      }
      if (errorType == "ipass") {
        return <span className="invalid">Wrong email or password!</span>;
      }
      if (errorType == "activate") {
        return <span className="invalid">Please activate account!</span>;
      }
      if (errorType == "wpassl") {
        return <span className="invalid">Wrong password length!</span>;
      }
    }
    return <></>;
  }
  function validateEmail(username) {
    if (
      username
        .trim()
        .match(
          /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        ) == null
    ) {
      setAlert(true);
      setErrorType("iemail");
      document.getElementById("email").classList.add("wrong");
      document.getElementById("email").classList.remove("correct");
      document.getElementById("loginButton").classList.add("not-allowed");
      document.getElementById("loginButton").classList.remove("cursor");
      return false;
    }
    setAlert(false);
    setErrorType("");
    setButtonDisable(false);
    document.getElementById("email").classList.remove("wrong");

    document.getElementById("email").classList.add("correct");
    document.getElementById("loginButton").classList.add("cursor");
    document.getElementById("loginButton").classList.remove("not-allowed");
    return true;
  }
  function passwordValidate(password) {
    console.log("run");
    if (password.length != 0) {
      document.getElementById("loginButton").classList.add("cursor");
      document.getElementById("loginButton").classList.remove("not-allowed");
      setButtonDisable(false);
    } else {
      document.getElementById("loginButton").classList.add("not-allowed");
      document.getElementById("loginButton").classList.remove("cursor");
      setButtonDisable(true);
    }
  }
  async function LoginBtn(e) {
    e.preventDefault();
    if (!alert && username.length != 0 && password.length != 0) {
      var urlencoded = new URLSearchParams();
      urlencoded.append("username", username);
      urlencoded.append("password", password);
      let options = {
        method: "POST",
        credentials: "include",
        withCredentials: true,
        //mode:'no-cors',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", //
          //"Access-Control-Allow-Origin": process.env.REACT_APP_API_BASE//'http://localhost:3000',
        },
        body: urlencoded,
      };
      let res = await fetch(
        process.env.REACT_APP_API_BASE + "/account/rest-api/login",
        options
      );


      let data = await res.json();
      console.log(data);

      if (data.success == true) {
        if ((data.message.userActive = true)) {
          dispach(user(data));
          props.history.replace("/dashboard");


        } else {
          console.log("plesea verify email");
          setAlert(true);
        }
      } else {
        if (data.message.error == "EWRONGDATA") {
          console.log("wrong username or password");
          setAlert(true);
          setErrorType("ipass");
        }
        if (data.message.error == "EINVALIDDATA") {
          console.log("passlength");
          setAlert(true);
          setErrorType("wpassl");
        }
      }
    } else {
      setButtonDisable(true);
      document.getElementById("loginButton").classList.add("not-allowed");
      document.getElementById("loginButton").classList.remove("cursor");
    }
  }

  if (loaded) {
    return (
      <div>
        <Grid container>
          <Grid item xs={6} className="formRoot">
            <div className="logoContainer">
              <div className="logoImg"></div>
              <span className="logoTitle">Privyplay</span>
            </div>
            <form class="form">
              <span class="loginTitle">Hi, happy to see you again</span>

              <div className="formTextboxContainer">
                <div
                  class="wrap-input100 rs1-wrap-input100 validate-input m-b-20"
                  data-validate="Type user name"
                >
                  <span className="fieldHeader">Email</span>
                  <input
                    id="email"
                    variant="outlined"
                    className="input100 textbox"
                    type="text"
                    name="pass"
                    placeholder="email@provider.com"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      validateEmail(e.target.value);
                    }}
                  />
                </div>
                <div
                  class="wrap-input100 rs2-wrap-input100 validate-input m-b-20"
                  data-validate="Type password"
                >
                  <span className="fieldHeader">Password</span>
                  <Link className="fieldHeaderForgot" to="/passrecovery">
                    Forgot Password
                  </Link>
                  <input
                    id="password"
                    onChangeCapture={(e) => {
                      passwordValidate(e.target.value);
                    }}
                    variant="outlined"
                    className="input100 textbox"
                    type="text"
                    name="pass"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <div class="container-login100-form-btn">
                  <MyAlert />
                  <button
                    disabled={buttonDisable}
                    id="loginButton"
                    class="login100-form-btn"
                    onClick={LoginBtn}
                  >
                    Sign in
                  </button>
                </div>
              </div>
              <div className="signUpContainer">
                <div class="w-full  signup">
                  Don't have a Privyplay account?
                </div>
                <span className="signUpBtn">
                  <Link to="/register">Sign Up!</Link>
                </span>
              </div>
            </form>
          </Grid>

          <Grid item xs={6} className="imgRoot">
            <div className="imgBackround">
              <span className="imgHeadingLogin">
                The freedom to express yourself in videos even more using
                faster-playing embeds with accesscontrol options!
              </span>
              <div class="mainImg">
                <span class="helper"></span>
                <img src={BgImage} className="loginimg" alt="heelo" />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return <h1>loading</h1>;
  }
}

export default Settings;
