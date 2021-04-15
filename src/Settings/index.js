import React, { useState } from 'react'
import './../Styles/dashboard.css'

import Logo from './../Images/logo.png'

import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Dropdown } from 'react-bootstrap';
import { Avatar, Card, CardActions, CardContent, Typography } from '@material-ui/core';



import SubscriptionsSharpIcon from '@material-ui/icons/SubscriptionsSharp';
import AssignmentTurnedInSharpIcon from '@material-ui/icons/AssignmentTurnedInSharp';
import SettingsSharpIcon from '@material-ui/icons/SettingsSharp';
import { useSelector } from 'react-redux';




const drawerWidth = 180;

const useStylesDrawer = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#f9f9f9',
        height: "100%"
    },
    appBar: {
        backgroundColor: '#f9f3f0',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        boxShadow: 'none !important'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0

    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "#ff8f50"
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'

    },
    drawerHeaderFirst: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: '0px',
        justifyContent: 'flex-end'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));
const useStylesCards = makeStyles({
    root: {
        minWidth: 10,
        width: '80%',
        borderRadius: '17px',
        backgroundColor: "#f2eeef",
        boxShadow: 'none !important',
        marginBottom: '20px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    content: {
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontSize: '20px',
        fontWeight: '750',
        color: "#fca676"
    },
    textbox: {
        marginBottom: 12,
        border: '2px solid #fca676',
        borderRadius: '10px',
        paddingLeft: '7px',
        width: '40%',
        height: '30px',
        marginLeft: 'auto',
        marginRight: 'auto'

    },
    btn: {
        padding: '0 20px',
        width: ' 30%',
        height: ' 30px',
        borderRadius: ' 14px',
        background: ' #fe6308',
        fontSize: ' 15px',
        fontWeight: ' 500',
        color: ' #fff',
        lineHeight: ' 1.2',
        letterSpacing: ' 1px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    alert: {
        fontSize: '2px'
    }
});

function Settings({ history }) {
    const [alert, setAlert] = useState(false);
    const [errorType, setErrorType] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    let UserData = useSelector(state => state.User);
    function MyAlert({ field, mclass }) {
        if (alert) {
            if (field == "email") {
                if (errorType == 'iemail') {
                    return (<span className={mclass} >Not a valid email!</span>)
                }
                if (errorType == 'eemail') {
                    return (<span className={mclass}>Email already exists</span>)
                }
            }
            if (field == "password") {
                if (errorType == 's') {
                    return (<span className={mclass}>at least one small character</span>)
                }
                if (errorType == 'b') {
                    return (<span className={mclass}>at least one capital character</span>)
                }
                if (errorType == 'l') {
                    return (<span className={mclass}>at least 7 characters</span>)
                }
                if (errorType == 'sp') {
                    return (<span className={mclass}>at least one special character</span>)
                }
                if (errorType == 'n') {
                    return (<span className={mclass}>at least one number</span>)
                }
            }
            if (field == "username") {
                if (errorType == 'username') {
                    return (<span className={mclass}>Not a valid username!</span>)
                }
            }

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

        }
        document.getElementById('email').classList.remove('wrong');
        document.getElementById('email').classList.add('correct');
        setAlert(false);
        setErrorType('');

    }
    function validatePassword(pass) {
        if (pass.match(/(?=.*[a-z])/) == null) {
            //at least one small character
            document.getElementById('password').classList.remove('correct');
            document.getElementById('password').classList.add('wrong');
            setAlert(true);
            setErrorType('s');

        }
        if (pass.match(/(?=.*[A-Z])/) == null) {
            //at least one capital character
            document.getElementById('password').classList.remove('correct');
            document.getElementById('password').classList.add('wrong');
            setAlert(true);
            setErrorType('b');

        }
        if (pass.length < 7) {
            //at least 8 characters
            document.getElementById('password').classList.remove('correct');
            document.getElementById('password').classList.add('wrong');
            setAlert(true);
            setErrorType('l');

        }
        if (pass.match(/(?=.*[0-9])/) == null) {
            //at least one number
            document.getElementById('password').classList.remove('correct');
            document.getElementById('password').classList.add('wrong');
            setAlert(true);
            setErrorType('n');

        }
        if (pass.match(/[&!@#.$%^*]/) == null) {
            //at least one special character
            document.getElementById('password').classList.remove('correct');
            document.getElementById('password').classList.add('wrong');
            setAlert(true);
            setErrorType('sp');

        }
        document.getElementById('password').classList.remove('wrong');
        document.getElementById('password').classList.add('correct');
        setAlert(false);
        setErrorType('');


    }
    function validateUsername(username) {
        if (username.length < 4) {
            console.log('username must contain at least 4 characters');
            document.getElementById('username').classList.remove('correct');
            document.getElementById('username').classList.add('wrong');
            setAlert(true);
            setErrorType('username');

        }
        document.getElementById('username').classList.remove('wrong');
        document.getElementById('username').classList.add('correct');
        setAlert(false);
        setErrorType('');

    }

    const mobileDrawer = window.innerWidth > 861;
    const classes = useStylesDrawer();
    const cardClasses = useStylesCards();
    const theme = useTheme();
    const [open, setOpen] = useState(mobileDrawer);


    function LogOut() {
        //Logout happens

        history.replace("/")

    }

    async function usernameChange() {
        if (errorType == '') {
            let confPassword = document.getElementById('confPassword1').value;
            let myHeaders = new Headers();
            myHeaders.append("CSRF-Token",UserData.message.csrftoken);
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            console.log(UserData.message.csrftoken);
            let urlencoded = new URLSearchParams();
            urlencoded.append("email", email);
            urlencoded.append("password", confPassword);

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };
            
            console.log(requestOptions);
            let res = await fetch(process.env.REACT_APP_API_BASE + '/account/rest-api/emailChangeRequest', requestOptions)
            let data = await res.json();
            console.log(data);
        }
    }

    async function emailChange() {

        if (errorType == '') {
            let confPassword = document.getElementById('confPassword2').value;
            let myHeaders = new Headers();
            myHeaders.append("CSRF-Token",UserData.message.csrftoken);
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            console.log(UserData.message.csrftoken);
            let urlencoded = new URLSearchParams();
            urlencoded.append("email", email);
            urlencoded.append("password", confPassword);

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };
            
            console.log(requestOptions);
            let res = await fetch(process.env.REACT_APP_API_BASE + '/account/rest-api/emailChangeRequest', requestOptions)
            let data = await res.json();
            console.log(data);
        }

    }
    async function passwordChange() {
        if (errorType == '') {
            let confPassword = document.getElementById('confPassword3').value;
            let myHeaders = new Headers();
            myHeaders.append("CSRF-Token",UserData.message.csrftoken);
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            console.log(UserData.message.csrftoken);
            let urlencoded = new URLSearchParams();
            urlencoded.append("newPassword", password);
            urlencoded.append("password", confPassword);

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };
            
            console.log(requestOptions);
            let res = await fetch(process.env.REACT_APP_API_BASE + '/account/rest-api/passwordChangeRequest', requestOptions)
            let data = await res.json();
            console.log(data);
        }
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open
                })}

            >
                <Toolbar className="toolbar">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon style={{ color: 'black' }} />
                    </IconButton>
                    <span></span>
                    <div style={{ display: "flex" }}>
                        <Avatar src="" style={{ backgroundColor: "#f8f8f8", color: '#bebebe', border: '2px solid #fca676' }} ></Avatar>
                        <Dropdown>
                            <Dropdown.Toggle style={{ color: '#303030' }} variant="Secondary" id="dropdown-basic">
                                Yash Pal
                                </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={LogOut} >Log out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Toolbar>


            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}

            >
                <div className={classes.drawerHeader}>
                    <img src={Logo} onClick={() => { history.replace('/dashboard') }} style={{ cursor: "pointer", justifyContent: "space-between", maxHeight: '50px', maxWidth: '250px' }} />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List style={{ paddingTop: "0px" }}>
                    {
                        (

                            <>
                                <ListItem button onClick={() => { history.replace("/dashboard") }} key={1}>
                                    <ListItemIcon style={{ color: "black" }}>{<AssignmentTurnedInSharpIcon />}</ListItemIcon>
                                    <ListItemText primary="Dashboard" />
                                </ListItem>
                                <ListItem button onClick={() => { history.replace("/videos") }} key={2} >
                                    <ListItemIcon style={{ color: "black" }}>{<SubscriptionsSharpIcon />}</ListItemIcon>
                                    <ListItemText primary="Videos" />
                                </ListItem>
                                <ListItem button style={{ backgroundColor: "#f7c9b8" }} key={3} >
                                    <ListItemIcon style={{ color: "black" }}>{<SettingsSharpIcon />}</ListItemIcon>
                                    <ListItemText primary="Settings" />
                                </ListItem>
                            </>

                        )
                    }
                </List>


            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />





                <div className="settings-content">

                    <Card className={cardClasses.root} key="1">
                        <CardContent className={cardClasses.content}>
                            <Typography className={cardClasses.title + ' cardTitle'} color="textSecondary" >
                                Username
                                </Typography>
                            <input className={cardClasses.textbox} onChange={e => { setUsername(e.target.value); validateUsername(e.target.value) }} value={username} type="text" id="username" placeholder="Your new Username" />
                            <input className={cardClasses.textbox} onChange={(e) => { validatePassword(e.target.value) }} type="text" id="confPassword1" placeholder="Current Password" />
                            <MyAlert mclass={cardClasses.alert} />
                            <button className={cardClasses.btn} onClick={usernameChange} type="button">Confirm Changes</button>
                        </CardContent>
                        <CardActions>

                        </CardActions>


                    </Card>

                    <Card className={cardClasses.root} key="2" >
                        <CardContent className={cardClasses.content}>
                            <Typography className={cardClasses.title + ' cardTitle'} color="textSecondary" >
                                Email
                                </Typography>
                            <input className={cardClasses.textbox} onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value) }} value={email} type="text" id="email" placeholder="Your new Email" />
                            <input className={cardClasses.textbox} onChange={(e) => { validatePassword(e.target.value) }} type="text" id="confPassword2" placeholder="Current Password" />
                            <MyAlert mclass={cardClasses.alert} />
                            <button className={cardClasses.btn} onClick={emailChange} type="button">Confirm Changes</button>
                        </CardContent>
                        <CardActions>

                        </CardActions>

                    </Card>

                    <Card className={cardClasses.root} key="3" >
                        <CardContent className={cardClasses.content}>
                            <Typography className={cardClasses.title + ' cardTitle'} color="textSecondary" >
                                Password
                                </Typography>
                            <input className={cardClasses.textbox} value={password} type="text" id="password" placeholder="Your new Password" onChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value) }} />
                            <input className={cardClasses.textbox} onChange={(e) => { validatePassword(e.target.value) }} type="text" id="confPassword3" placeholder="Current Password" />
                            <MyAlert mclass={cardClasses.alert} />
                            <button className={cardClasses.btn} onClick={passwordChange} type="button">Confirm Changes</button>
                        </CardContent>
                        <CardActions>

                        </CardActions>

                    </Card>
                </div>





            </main>
        </div>
    );


}

export default Settings;
