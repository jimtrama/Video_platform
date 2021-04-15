import React, { useState, useEffect } from 'react'
import './../Styles/dashboard.css'
import './../Styles/videos.css'
import './modalAddVideo.css'
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
import { PublishRounded } from '@material-ui/icons'

import { Switch } from '@material-ui/core'
import { Dropdown } from 'react-bootstrap';
import { Avatar, Modal } from '@material-ui/core';


import Grid from '@material-ui/core/Grid';


import SubscriptionsSharpIcon from '@material-ui/icons/SubscriptionsSharp';
import AssignmentTurnedInSharpIcon from '@material-ui/icons/AssignmentTurnedInSharp';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SettingsSharpIcon from '@material-ui/icons/SettingsSharp';

import Img from './../videosImg/1.jpg'
import { useSelector } from 'react-redux'

let data = {
    videos: [{
        title: "hello World",
        link: "http://www.google.com",
        img: "./../videosImg/1.jpg"
    }, {
        title: "Learn Java",
        link: "http://www.google.com",
        img: "./../videosImg/1.jpg"
    }, {
        title: "Learn Java",
        link: "http://www.google.com",
        img: "./../videosImg/1.jpg"
    }, {
        title: "Learn Java",
        link: "http://www.google.com",
        img: "./../videosImg/1.jpg"
    }, {
        title: "Learn Java",
        link: "http://www.google.com",
        img: "./../videosImg/1.jpg"
    }, {
        title: "Learn Java",
        link: "http://www.google.com",
        img: "./../videosImg/1.jpg"
    }, {
        title: "Learn Java",
        link: "http://www.google.com",
        img: "./../videosImg/1.jpg"
    }, {
        title: "Learn Java",
        link: "http://www.google.com",
        img: "./../videosImg/1.jpg"
    }]
}


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
function Videos({ history }) {
    let User = useSelector(state => state.persistedStore.message);
    
    const mobileDrawer = window.innerWidth > 861;
    const classes = useStylesDrawer();
    const theme = useTheme();
    const [open, setOpen] = useState(mobileDrawer);
    const [countVideos, setCountVideos] = useState(0);
    const [search, setSearch] = useState("");
    const [addVideoModal, setAddVideoModal] = useState(false);

    const [data, setData] = useState([]);

    useEffect(() => {
        let headers = new Headers();
        headers.append("CSRF-Token",User.csrftoken)
        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers
        };

        fetch(process.env.REACT_APP_API_BASE+"/account/rest-api/getVideos/all/20/asc", requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result)})
            .catch(error => console.log('error', error));

    }, []);

    function addVideo() {
        setAddVideoModal(true);
    }
    function Search(input) {
        input = input.toLowerCase().trim();
        for (let video in data.videos) {
            if (video.title !== input) {

            }
        }
    }

    function LogOut() {
        //Logout happens
        history.replace('/')

    }





    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handelOptionsChange = (i) => {
        if (document.getElementById('menu' + i).getAttribute('value') == 'close') {
            document.getElementById('menu' + i).classList.add('showOptions');
            document.getElementById('menu' + i).setAttribute('value', 'open');
        }
        else {
            document.getElementById('menu' + i).classList.remove('showOptions')
            document.getElementById('menu' + i).setAttribute('value', 'close');
        }

    }
    function Edit(i) {

    }
    function Delete(i) {
        data.videos.splice(i, 1);
        console.log(data);
    }
    function GetLink(i) {

    }
    function AddVideoModal() {
        const [openModal, setOpenModal] = useState(false);
        const [urlVideo, setUrlVideo] = useState(false);
        const [textVideo, setTextVideo] = useState(null);
        const [textThumbnail, setTextThumbnail] = useState(null);
        const handleOpenModal = () => {
            setOpenModal(true);
        }
        const handleCloseModal = () => {
            setOpenModal(false);
        }
        const handleSwitchChange = (e) => {
            if (!urlVideo) {
                document.getElementsByClassName('MuiSwitch-track')[0].classList.add('coloredTrack');
            } else {
                document.getElementsByClassName('MuiSwitch-track')[0].classList.remove('coloredTrack');
            }
            setUrlVideo(!urlVideo);
        }
        async function addVideo() {
            let file = document.getElementById("file");
            let title = document.getElementById("title");
            let domains = document.getElementById("domains");
            var myHeaders = new Headers();
            myHeaders.append("CSRF-Token", User.csrftoken);

            var formdata = new FormData();
            formdata.append("videofile", file.files[0]);
            //formdata.append("thumbnail", fileInput.files[0], "/path/to/file");
            formdata.append("title", title);
            //formdata.append("srcUrl", "");
            //formdata.append("isGoogleVideo", "1");
            //formdata.append("playInDomains", "privyplay.com fiddle.jshell.net jsfiddle.net");
            formdata.append("mediaType", "mp4");

            var requestOptions = {
                method: 'PUT',
                headers: {},
                body: formdata,
                redirect: 'follow'
            };

            let res = await fetch(process.env.REACT_APP_API_BASE + "/account/rest-api/addVideo", requestOptions);
            let data = await res.json();
            console.log(data);
        }
        return (
            <div className="addVideoModalContainer">

                <button className="headerButton" onClick={handleOpenModal}>Add Video</button>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                >
                    <div className="addVideoContainer">

                        <span style={{ margin: "2px auto", width: "fit-content" }}>Local File/Url File</span>
                        <div className="switchContainer">
                            <Switch
                                checked={urlVideo}
                                onChange={handleSwitchChange}
                            />
                        </div>
                        <div className="inputContainerFirst">
                            <span>Title</span>
                            <input id="title" className="addVideoTitle" placeholder="Title" />
                        </div>
                        <div className="inputContainerSec">
                            <span>Domains Accepted</span>
                            <input id="domains" className="addVideoDomains" placeholder="Domains Accepted" />
                        </div>

                        <div className="filesContainer">
                            {
                                urlVideo ? (

                                    <div className="inputContainer">

                                        <input id="url" className="addVideoUrl" type="text" placeholder="Video's Url" />
                                    </div>


                                ) : (
                                    <>
                                        <div className="inputContainer">
                                            <div className="filePicker" >
                                                <PublishRounded />
                                                <label for="file" className="labelFileInput"  >
                                                    <span>
                                                        {
                                                            textVideo ? (textVideo) : ("Choose Video")
                                                        }
                                                    </span>
                                                </label>
                                            </div>
                                            <input id="file" onChange={(e) => { setTextVideo(e.target.files[0].name) }} className="addVideoFile" type="file" />
                                        </div>


                                    </>

                                )
                            }
                            <div className="inputContainer">
                                <div className="filePicker" >
                                    <PublishRounded />
                                    <label for="thumbnail" className="labelFileInput"  >
                                        <span>

                                            {
                                                textThumbnail ? (textThumbnail) : ("Choose Thumbnail")
                                            }
                                        </span>
                                    </label>
                                </div>
                                <input id="thumbnail" onChange={(e) => { setTextThumbnail(e.target.files[0].name) }} className="addVideoFile" type="file" />
                            </div>
                        </div>





                        {
                            urlVideo ? (
                                <button className="addVideoBtn" onClick={addVideo}>Add Video</button>

                            ) : (
                                <button className="addVideoBtn" onClick={addVideo}>Add Video</button>
                            )
                        }




                    </div>
                </Modal>
            </div>
        )
    }
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
                    <img src={Logo} onClick={() => { history.replace('/dashboard') }} style={{ cursor: "pointer", justifyContent: "space-between", maxHeight: '50px', maxWidth: '50px', marginRight: 'auto', marginLeft: 'auto' }} />
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
                                <ListItem button style={{ backgroundColor: "#f7c9b8" }} key={2} >
                                    <ListItemIcon style={{ color: "black" }}>{<SubscriptionsSharpIcon />}</ListItemIcon>
                                    <ListItemText primary="Videos" />
                                </ListItem>
                                <ListItem button onClick={() => { history.replace("/settings") }} key={3} >
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




                <div className="secondHeader" >


                    <input type="text" className="searchVideo" placeholder="Search A Video" value={search} onChange={(e) => { setSearch(e.target.value); Search(e.target.value); }} />



                    <AddVideoModal />

                    <div className="countVideoContainer">
                        <span className="countVideolabel">Total Videos</span>
                        <span className="countVideosVariable" id="countVideos">{countVideos}</span>
                    </div>


                </div>
                <div className="videosContainer" >


                    {
                        data.map((value, i) => {

                            return (

                                <div className="videoCard">
                                    <span className="videoTitle">{value.title}</span>
                                    <div className="videoImg"><img src={Img}></img></div>
                                    <div className="moreOptionsContainer">
                                        <MoreHorizIcon className="videoOptions" onClick={() => { handelOptionsChange(i) }} />
                                        <div className="optionsMenu" id={"menu" + i} value="close">
                                            <div className="showOptionsConteiner" onClick={() => { Delete(i) }}>
                                                <span>Delete</span>
                                            </div>
                                            <div className="showOptionsConteiner" onClick={() => { Edit(i) }}>
                                                <span>Edit</span>
                                            </div>
                                            <div className="showOptionsConteiner" onClick={() => { GetLink(i) }}>
                                                <span>Get Video Link</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            )
                        })
                    }

                </div>





            </main>
        </div>
    );


}

export default Videos;
