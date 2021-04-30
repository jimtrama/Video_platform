import { Checkbox, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BgImage from "./../../Images/LoginBg.png"





function Index(props) {
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [checked, setChecked] = useState(false);
    const [alert, setAlert] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);
    const [errorType, setErrorType] = useState('');
    const [alertchecked, setalertchecked] = useState(false);

    function MyAlert({ field }) {
        if (alert) {
            if (field == "email") {
                if (errorType == 'iemail') {
                    return (<span className='invalidRegister'>Not a valid email!</span>)
                }
                if (errorType == 'eemail') {
                    return (<span className='invalidRegister'>Email already exists</span>)
                }
            }
            if (field == "password") {
                if (errorType == 's') {
                    return (<span className='invalidRegister'>at least one small character</span>)
                }
                if (errorType == 'b') {
                    return (<span className='invalidRegister'>at least one capital character</span>)
                }
                if (errorType == 'l') {
                    return (<span className='invalidRegister'>at least 7 characters</span>)
                }
                if (errorType == 'sp') {
                    return (<span className='invalidRegister'>at least one special character</span>)
                }
                if (errorType == 'n') {
                    return (<span className='invalidRegister'>at least one number</span>)
                }
            }
            if (field == "username") {
                if (errorType == 'username') {
                    return (<span className='invalidRegister'>Not a valid username!</span>)
                }
            }
            if (field == "website") {
                if (errorType == 'website') {
                    return (<span className='invalidRegister'>Not a valid website!</span>)
                }
            }

        }
        return (<></>)
    }
    function MyAlertChecked() {
        if (alertchecked) {
            return (<span className='invalidRegister'>Please accept the terms to procced</span>)
        }
        return (<></>)
    }


    function validateEmail(email) {
        if (email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i) == null) {
            console.log('not mail');
            document.getElementById('email').classList.remove('correct');
            document.getElementById('email').classList.add('wrong');
            setAlert(true);
            setErrorType('iemail');
            return false;
        }
        document.getElementById('email').classList.remove('wrong');
        document.getElementById('email').classList.add('correct');
        setAlert(false);
        setErrorType('');
        setButtonDisable(false);
        return true;
    }
    function validatePassword(pass) {
        if (pass.match(/(?=.*[a-z])/) == null) {
            //at least one small character
            document.getElementById('password').classList.remove('correct');
            document.getElementById('password').classList.add('wrong');
            setAlert(true);
            setErrorType('s');
            return 's';
        }
        if (pass.match(/(?=.*[A-Z])/) == null) {
            //at least one capital character
            document.getElementById('password').classList.remove('correct');
            document.getElementById('password').classList.add('wrong');
            setAlert(true);
            setErrorType('b');
            return 'b';
        }
        if (pass.length < 7) {
            //at least 8 characters
            document.getElementById('password').classList.remove('correct');
            document.getElementById('password').classList.add('wrong');
            setAlert(true);
            setErrorType('l');
            return 'l';
        }
        if (pass.match(/(?=.*[0-9])/) == null) {
            //at least one number
            document.getElementById('password').classList.remove('correct');
            document.getElementById('password').classList.add('wrong');
            setAlert(true);
            setErrorType('n');
            return 'n';
        }
        if (pass.match(/[&!@#.$%^*]/) == null) {
            //at least one special character
            document.getElementById('password').classList.remove('correct');
            document.getElementById('password').classList.add('wrong');
            setAlert(true);
            setErrorType('sp');
            return 'sp';
        }
        document.getElementById('password').classList.remove('wrong');
        document.getElementById('password').classList.add('correct');
        setAlert(false);
        setErrorType('');
        setButtonDisable(false);
        return null;

    }
    function validateUsername(username) {
        if (username.length < 4) {
            console.log('username must contain at least 4 characters');
            document.getElementById('username').classList.remove('correct');
            document.getElementById('username').classList.add('wrong');
            setAlert(true);
            setErrorType('username');
            return false;
        }
        document.getElementById('username').classList.remove('wrong');
        document.getElementById('username').classList.add('correct');
        setAlert(false);
        setErrorType('');
        setButtonDisable(false);
        return true;
    }
    function validateWebsite(website) {

        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i');
        if (website.match(pattern) != null) {

            document.getElementById('website').classList.remove('wrong');
            document.getElementById('website').classList.add('correct');
            setAlert(false);
            setErrorType('');
            setButtonDisable(false);
            return true;
        } else {
            console.log('websire error');
            document.getElementById('website').classList.remove('correct');
            document.getElementById('website').classList.add('wrong');
            setAlert(true);
            setErrorType('website');
            return false;
        }
    }
    const handleCheckbocChange = (event) => {
        setChecked(event.target.checked);
        if (event.target.checked) {
            setalertchecked(false);
        }
    }

    async function SignUp(e) {
        e.preventDefault();
        if (!checked) {
            setalertchecked(true);
            return;
        }
        if (!validateEmail(email)) {
            return;
        }
        if (!validateUsername(username)) {

            return;
        }
        if (validatePassword(password) != null) {
            return;
        }
        if (!validateWebsite(website)) {
            return;
        }


        let urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("password", password);
        urlencoded.append("name", username);
        urlencoded.append("website", website);
        let body = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: urlencoded
        }
        let res = await fetch(process.env.REACT_APP_API_BASE + '/account/rest-api/signup', body);
        let data = await res.json();
        console.log(data);
        if (data.success == true) {
            console.log('successful register');
            //show a message login in that usr coming from register succeful
            props.history.replace('/');
        } else if (data.message.error == 'EEMAILEXISTS') {
            setAlert(true);
            setErrorType('eemail');

        }


    }


    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [])

    if (loaded) {
        return (
            <div>

                <Grid container>

                    <Grid item xs={6} className='formRoot'>

                        <form class="form">
                            <div className="logoContainer">
                                <div className='logoImg' style={{ cursor: "pointer" }} onClick={() => { props.history.replace('/') }}></div>
                                <span className="logoTitle">Privyplay</span>

                            </div>

                            <span class="loginTitle">Welcome to signup!</span>

                            <div class="wrap-input100 rs1-wrap-input100 validate-input m-b-20" data-validate="Type user name">
                                <span className='fieldHeader'>Email</span>
                                <input id="email" variant="outlined" className="input100 textbox" type="text" name="pass" placeholder="email@provider.com" value={email} onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value) }} />
                                <MyAlert field="email" />
                            </div>
                            <div class="wrap-input100 rs2-wrap-input100 validate-input m-b-20" data-validate="Type password">
                                <span className='fieldHeader'>Password</span>

                                <input id="password" variant="outlined" className="input100 textbox" type="text" name="pass" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value) }} />
                                <MyAlert field="password" />

                            </div>
                            <div class="wrap-input100 rs2-wrap-input100 validate-input m-b-20" data-validate="Type password">
                                <span className='fieldHeader'>Username</span>

                                <input id="username" variant="outlined" className="input100 textbox" type="text" name="pass" placeholder="First Last" value={username} onChange={(e) => { setUsername(e.target.value); validateUsername(e.target.value) }} />
                                <MyAlert field="username" />

                            </div>
                            <div class="wrap-input100 rs3-wrap-input100 validate-input" data-validate="Type password">
                                <span className='fieldHeader'>Website</span>

                                <input id="website" variant="outlined" className="input100 textbox" type="text" name="pass" placeholder="www.yourdomain.com" value={website} onChange={(e) => { setWebsite(e.target.value); validateWebsite(e.target.value) }} />

                                <MyAlert field="website" />
                            </div>
                            <div className="checkBoxContainer">
                                <Checkbox checked={checked} onChange={handleCheckbocChange} />
                                <span className='checkboxTitle'>I accept Privyplay’s terms and conditions</span>

                            </div>
                            <MyAlertChecked />
                            <div class="container-login100-form-btn">


                                <button disabled={buttonDisable} class="login100-form-btn" onClick={SignUp}>Sign Up</button>

                            </div>
                            <div className="signUpContainer">

                                <div style={{ marginTop: '10px' }}>
                                    <div class="w-full  signup">Have a Privyplay account?</div>
                                    <span className='signUpBtn'><Link to='/'>Sign In!</Link></span>
                                </div>
                            </div>

                        </form>
                    </Grid>

                    <Grid item xs={6} className='imgRoot'>
                        <div className="imgBackround">
                            <div className="headingForImgContener">
                                <span className="imgHeadingTitle">
                                    Get started with a free account today
                                </span>
                                <span className="imgHeading">
                                    For the freedom to express yourself in videos even more using faster-playing embeds with access control options!
                                </span>
                            </div>

                            <div class="mainImg" >
                                <span class="helper"></span>
                                <img src={BgImage} className='loginimg' alt="heelo" />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    } else { return (<h1>loading</h1>) }
}

export default Index
