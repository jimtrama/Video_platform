import React, { useState, useEffect } from "react";
import "./../Dashboard/dashboard.css";
import "./videos.css";
import "./modalAddVideo.css";
import Logo from "./../../Images/logo.png";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { PublishRounded } from "@material-ui/icons";

import { Switch } from "@material-ui/core";
import { Dropdown } from "react-bootstrap";
import { Avatar, Modal } from "@material-ui/core";

import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import SubscriptionsSharpIcon from "@material-ui/icons/SubscriptionsSharp";
import AssignmentTurnedInSharpIcon from "@material-ui/icons/AssignmentTurnedInSharp";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SettingsSharpIcon from "@material-ui/icons/SettingsSharp";


import { useDispatch, useSelector } from "react-redux";
import { user } from "../../ReduxStore/Actions";
import Auth from "../../Auth";


const drawerWidth = 180;

const useStylesDrawer = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#f9f9f9",
    height: "100%",
  },
  appBar: {
    backgroundColor: "#f9f3f0",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "none !important",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#ff8f50",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  drawerHeaderFirst: {
    display: "flex",
    alignItems: "center",
    paddingTop: "0px",
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
function Videos({ history }) {
  let User = useSelector((state) => state.persistedStore.message);
  console.log(User);
  const dispach = useDispatch();
  const mobileDrawer = window.innerWidth > 861;
  const classes = useStylesDrawer();
  const theme = useTheme();
  const [open, setOpen] = useState(mobileDrawer);
  const [countVideos, setCountVideos] = useState(0);
  const [search, setSearch] = useState("");
  const [addVideoModal, setAddVideoModal] = useState(false);

  const [data, setData] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);

  const [videoOfOptions, setvideoOfOptions] = useState({})
  const [cookiesession, setCookiesession] = useState("");
  useEffect(() => {
    async function load() {
      let myHeaders = new Headers();
      let strSeesion = "";
      let cookie = User.session;
      console.log(cookie);
      let tempcountcookie = 0;
      for (let key in cookie) {
        if (tempcountcookie == 2) {
          strSeesion += "" + key + cookie[key]
        } else {
          strSeesion += "" + key + cookie[key] + ";"
        }

        tempcountcookie++;

      }
      console.log(strSeesion);
      setCookiesession(strSeesion)
      myHeaders.append("Cookie", strSeesion);
      let requestOptions = {
        method: "GET",
        redirect: "follow",
        credentials: "include",
        withCredentials: true,
        headers: myHeaders
      };

      let res = await fetch(
        process.env.REACT_APP_API_BASE + "/account/rest-api/getVideos/all/50/asc",
        requestOptions
      )
      let dataAll = await res.json();
      console.log(dataAll);

      requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders
      };
      setCountVideos(dataAll.message.res.length)
      let tempArray = [];
      for (let i = 0; i < dataAll.message.res.length; i++) {
        res = await fetch(
          process.env.REACT_APP_API_BASE + "/playback/poster/" + dataAll.message.res[i].documentId,
          requestOptions
        )
        let dataThumb = await res.blob();
        tempArray.push({ image: dataThumb, title: dataAll.message.res[i].title, id: dataAll.message.res[i].documentId });
      }

      setData(tempArray.reverse());
      setDataToShow(tempArray);
      //addzIndex();


    }
    load();


  }, []);
  // const addzIndex = () => {
  //   let imgzindex = 0;
  //   for (let i = document.getElementsByClassName('videoCard').length - 1; i >= 0; i--) {
  //     document.getElementsByClassName('videoCard')[i].style.zIndex = imgzindex * 10;
  //     imgzindex += 10
  //   }
  // }

  function addVideo() {
    setAddVideoModal(true);
  }
  function Search(input) {
    console.log(data);
    console.log(input);
    let tempArr = [];
    input = input.toLowerCase().trim();
    for (let video of data) {
      if (video.title.toLowerCase().trim().includes(input)) {
        tempArr.push(video)
      }
    }
    setDataToShow(tempArr)
    //addzIndex();
  }

  async function LogOut() {
    //Logout happens

    let res = await fetch(process.env.REACT_APP_API_BASE + "/account/rest-api/logout");
    let data = await res.json();
    if (data.message.loggedout) {
      Auth.logOut();
      history.replace("/");
      dispach(user({ loggedin: false }));

    }

  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handelOptionsOpen = (video, i) => {
    if (!open) {
      setOpen(true)
    }
    if (i == videoOfOptions.i) {
      handelOptionsClose();
      setOpen(false);
      return;
    }
    if (document.getElementById("menu").classList.contains("fadeInOptions")) {
      document.getElementById("menu").classList.remove("fadeInOptions");
      document.getElementById("menu").classList.add("fadeToggleOptions");

      setvideoOfOptions(video);
    } else
      if (document.getElementById("menu").classList.contains("fadeToggleOptions")) {
        document.getElementById("menu").classList.remove("fadeToggleOptions");
        document.getElementById("menu").classList.add("fadeFromToggleOptions");

      } else if (document.getElementById("menu").classList.contains("fadeFromToggleOptions")) {
        document.getElementById("menu").classList.add("fadeToggleOptions");
        document.getElementById("menu").classList.remove("fadeFromToggleOptions");
      } else {
        document.getElementById("menu").classList.add("fadeInOptions");
        document.getElementById("menu").classList.remove("fadeOutOptions");
      }

    setvideoOfOptions({ video, i });

  };
  const handelOptionsClose = () => {
    document.getElementById("menu").classList.remove("fadeInOptions");
    document.getElementById("menu").classList.remove("fadeToggleOptions");
    document.getElementById("menu").classList.add("fadeOutOptions");
    setvideoOfOptions({});

  };
  function Edit() { }
  function Delete() {
    let tempArra = dataToShow;
    tempArra.splice(videoOfOptions.i, 1);
    handelOptionsClose();
    setDataToShow(tempArra);

  }
  function GetLink() {

    const el = document.createElement('textarea');
    el.value = "http://privy-rabbit.club/playback/" + videoOfOptions.video.id;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);



    document.getElementById("copylink").classList.add("fadeinLinkCopied")
    document.getElementById("copylink").classList.remove("fadeoutLinkCopied")
    setTimeout(() => {
      document.getElementById("copylink").classList.remove("fadeinLinkCopied")
      document.getElementById("copylink").classList.add("fadeoutLinkCopied")
    }, 1500)


  }
  function AddVideoModal() {
    const [openModal, setOpenModal] = useState(false);
    const [urlVideo, setUrlVideo] = useState(false);
    const [textVideo, setTextVideo] = useState(null);
    const [textThumbnail, setTextThumbnail] = useState(null);
    const handleOpenModal = () => {
      setOpenModal(true);
    };
    const handleCloseModal = () => {
      setOpenModal(false);
    };
    const handleSwitchChange = (e) => {
      if (!urlVideo) {
        document
          .getElementsByClassName("MuiSwitch-track")[0]
          .classList.add("coloredTrack");
      } else {
        document
          .getElementsByClassName("MuiSwitch-track")[0]
          .classList.remove("coloredTrack");
      }
      setUrlVideo(!urlVideo);
    };
    async function addVideo() {
      let formdata = new FormData();
      let title = document.getElementById("title").value;
      let domains = document.getElementById("domains").value;
      //domains += " ";
      let myHeaders = new Headers();
      myHeaders.append("CSRF-Token", User.csrftoken);
      //myHeaders.append("Content-Type", "multipart/formdata");




      if (!urlVideo) {
        console.log("local file uplaoding");
        let file = document.getElementById("file");
        formdata.append("videofile", file.files[0]);
        console.log(file.files[0]);
        formdata.append("isGoogleVideo", "1");
      }
      else {
        console.log("url file uploading");
        formdata.append("srcUrl", document.getElementById("url").value);
        formdata.append("isGoogleVideo", "0");
      }



      let fileInput = document.getElementById("thumbnail");
      if (fileInput.files[0]) {
        console.log(fileInput.files[0]);
        formdata.append("thumbnail", fileInput.files[0]);
        //console.log(fileInput.files[0]);
      }


      formdata.append("title", title);


      formdata.append("playInDomains", "privy-rabbit.club privyplay.com fiddle.jshell.net jsfiddle.net " + domains.trim());
      formdata.append("mediaType", "mp4");

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        credentials: "include",
        withCredentials: true,
        body: formdata,
        redirect: "follow",
      };

      let res = await fetch(
        process.env.REACT_APP_API_BASE + "/account/rest-api/addVideo",
        requestOptions
      );
      let data = await res.json();
      console.log(data);
      if (data.success) {
        window.location.reload();
      }
    }
    return (
      <div className="addVideoModalContainer">
        <button className="headerButton" onClick={handleOpenModal}>
          Add Video
        </button>
        <Modal open={openModal} onClose={handleCloseModal}>
          <div className="addVideoContainer">
            <span style={{ margin: "2px auto", width: "fit-content" }}>
              Local File/Url File
            </span>
            <div className="switchContainer">
              <Switch checked={urlVideo} onChange={handleSwitchChange} />
            </div>
            <div className="inputContainerFirst">
              <span>Title</span>
              <input id="title" className="addVideoTitle" placeholder="Title" />
            </div>
            <div className="inputContainerSec">
              <span>Domains Accepted</span>
              <input
                id="domains"
                className="addVideoDomains"
                placeholder="Domains Accepted"
              />
            </div>

            <div className="filesContainer">
              {urlVideo ? (
                <div className="inputContainer">
                  <input
                    id="url"
                    className="addVideoUrl"
                    type="text"
                    placeholder="Video's Url"
                  />
                </div>
              ) : (
                <>
                  <div className="inputContainer">
                    <div className="filePicker">
                      <PublishRounded />
                      <label for="file" className="labelFileInput">
                        <span>{textVideo ? textVideo : "Choose Video"}</span>
                      </label>
                    </div>
                    <input
                      id="file"
                      onChange={(e) => {
                        setTextVideo(e.target.files[0].name);
                      }}
                      className="addVideoFile"
                      type="file"
                    />
                  </div>
                </>
              )}
              <div className="inputContainer">
                <div className="filePicker">
                  <PublishRounded />
                  <label for="thumbnail" className="labelFileInput">
                    <span>
                      {textThumbnail ? textThumbnail : "Choose Thumbnail"}
                    </span>
                  </label>
                </div>
                <input
                  id="thumbnail"
                  onChange={(e) => {
                    setTextThumbnail(e.target.files[0].name);
                  }}
                  className="addVideoFile"
                  type="file"
                />
              </div>
            </div>

            {urlVideo ? (
              <button className="addVideoBtn" onClick={addVideo}>
                Add Video
              </button>
            ) : (
              <button className="addVideoBtn" onClick={addVideo}>
                Add Video
              </button>
            )}
          </div>
        </Modal>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
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
            <MenuIcon style={{ color: "black" }} />
          </IconButton>
          <span></span>
          <div style={{ display: "flex" }}>
            <Avatar
              src=""
              style={{
                backgroundColor: "#f8f8f8",
                color: "#bebebe",
                border: "2px solid #fca676",
              }}
            ></Avatar>
            <Dropdown>
              <Dropdown.Toggle
                style={{ color: "#303030" }}
                variant="Secondary"
                id="dropdown-basic"
              >
                {User.usernames}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/#/dashboard">Dashboard</Dropdown.Item>
                <Dropdown.Item href="#">Videos</Dropdown.Item>
                <Dropdown.Item href="/#/settings">Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={LogOut}>Log out</Dropdown.Item>
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
          <img
            src={Logo}
            onClick={() => {
              history.replace("/dashboard");
            }}
            style={{
              cursor: "pointer",
              justifyContent: "space-between",
              maxHeight: "50px",
              maxWidth: "50px",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List style={{ paddingTop: "0px" }}>
          {
            <>
              <ListItem
                button
                onClick={() => {
                  history.replace("/dashboard");
                }}
                key={1}
              >
                <ListItemIcon style={{ color: "black" }}>
                  {<AssignmentTurnedInSharpIcon />}
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button style={{ backgroundColor: "#f7c9b8" }} key={2}>
                <ListItemIcon style={{ color: "black" }}>
                  {<SubscriptionsSharpIcon />}
                </ListItemIcon>
                <ListItemText primary="Videos" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  history.replace("/settings");
                }}
                key={3}
              >
                <ListItemIcon style={{ color: "black" }}>
                  {<SettingsSharpIcon />}
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </>
          }
        </List>
        <Divider />
        <div className="optionsMenu" id="menu" >
          <div className="optionsContainer">
            <button className="closeOptionsBtn" onClick={() => { handelOptionsClose(); setOpen(false) }}><CancelRoundedIcon /></button>
            <div className="helpingOptionsContainer">
              <div
                className="showOptionsConteiner"

                onClick={() => {
                  Delete();
                }}
              >
                <span>Delete</span>
              </div>
              <div
                className="showOptionsConteiner"
                onClick={() => {
                  Edit();
                }}
              >
                <span>Edit</span>
              </div>
              <div
                className="showOptionsConteiner"
                onClick={() => {
                  GetLink();
                }}
              >
                <span>Get Video Link</span>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div id="copylink" className="LinkCopied">
          Link copied
        </div>
        <div className={classes.drawerHeader} />


        <div className="secondHeader">
          <input
            type="text"
            className="searchVideo"
            placeholder="Search A Video"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              Search(e.target.value);
            }}
          />

          <AddVideoModal />

          <div className="countVideoContainer">
            <span className="countVideolabel">Total Videos</span>
            <span className="countVideosVariable" id="countVideos">
              {countVideos}
            </span>
          </div>
        </div>
        <div className="videosContainer">
          {dataToShow.map((value, i) => {
            let tempImg;

            const url = URL.createObjectURL(value.image)
            tempImg = url;


            return (
              <div className="videoCard">
                <span className="videoTitle">{value.title}</span>
                <div className="videoImg">
                  <img src={tempImg}></img>
                </div>
                <div className="moreOptionsContainer">
                  <MoreHorizIcon
                    className="videoOptions"
                    onClick={() => {
                      handelOptionsOpen(value, i);
                    }}
                  />

                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Videos;
