import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import './dashboard.css'

import Logo from './../../Images/logo.png'

import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Dropdown } from 'react-bootstrap';
import { Avatar } from '@material-ui/core';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';


import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined';

import SubscriptionsSharpIcon from '@material-ui/icons/SubscriptionsSharp';
import AssignmentTurnedInSharpIcon from '@material-ui/icons/AssignmentTurnedInSharp';
import SettingsSharpIcon from '@material-ui/icons/SettingsSharp';

import { PieChart } from 'react-minimal-pie-chart';
import { user } from '../../ReduxStore/Actions';
import Auth from '../../Auth';


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
        width: '100%',
        borderRadius: '17px',
        backgroundColor: "#f2eeef",
        boxShadow: 'none !important',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        width: "fit-content",
        margin: "auto",
        fontSize: '18px',
        fontWeight: '750',
        color: "#fca676"
    },
    pos: {
        marginBottom: 12
    },
    number: {
        width: "fit-content",
        margin: "auto",
        fontSize: 60,
        fontWeight: '800',
        color: "#fca676",
        transform: 'scaleY(1.2)'

    },
    video: {
        width: "fit-content",
        margin: "auto",
        fontSize: '18px',
        fontWeight: '750',
        color: '#fca676'
    }
});





function OutlinedCard({ title, number }) {
    const classes = useStylesCards();


    return (
        <Card className={classes.root} >
            <CardContent>
                <Typography className={classes.title + ' cardTitle'} color="textSecondary" >
                    {title}
                </Typography>
                <Typography className={classes.number} >
                    {number}
                </Typography>
                <Typography className={classes.video} >
                    Videos
                </Typography>
            </CardContent>

        </Card>
    );
}

var notifications = [
    {
        title: "Today",
        summary: "Upload of video \" the cool river \" has failed",
        details: "jim said hello from his new phone",
        read: false
    },
    {
        title: "Today",
        summary: "kos send hello",
        details: "jim said hello from his new phone and he would like from u to respons",
        read: false
    },
    {
        title: "Today",
        summary: "kos send hello",
        details: "jim said hello from his new phone and he would like from u to respons",
        read: true
    },
    {
        title: "20/2/20",
        summary: "kos send hello",
        details: "jim said hello from his new phone and he would like from u to respons",
        read: true
    }
]
let pieData = [
    { title: 'Two', value: 4, color: '#C5C5C5' },
    { title: 'One', value: 16, color: '#f2994a' },


]
function AcordionBar() {
    return (
        <Card className='AcordionBarRoot' variant="outlined">
            <CardContent className='AcordionBarContent'>
                <span className='AcordionBarNumber'>2</span>
                <Typography className='AcordionBarTitle' variant="h5" component="h2">
                    Notifications
                </Typography>
            </CardContent>
            <CardActions className='AcordionBarActions'>
                <Button className='checkIcon' size="small"><DoneAllOutlinedIcon style={{ color: "#fca676" }} /></Button>
                <Button className='binIcon' size="small"><DeleteSweepOutlinedIcon style={{ color: "#fca676" }} /></Button>
            </CardActions>
        </Card>
    )
}

function AcordionNotification() {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (

        <div className='AcordionRoot'>
            <Card style={{ boxShadow: 'none', backgroundColor: 'white' }}>
                <CardContent style={{ paddingLeft: '0', paddingRight: '0', boxShadow: 'none', paddingTop: '5px', paddingBottom: '5px' }}>
                    {notifications.map((notification, i) => {
                        return (

                            <Accordion className={`${notification.read ? 'read' : 'unread'}`} expanded={expanded === `panel${i + 1}`} onChange={handleChange(`panel${i + 1}`)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${i + 1}bh-content`}
                                    id={`panel${i + 1}bh-header`}
                                >
                                    <Typography className='AcordionHeading'>{notification.title}</Typography>
                                    <Typography className='AcordionSecondaryHeading'>{notification.summary}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>{notification.details}</Typography>
                                </AccordionDetails>
                            </Accordion>

                        )
                    })}
                </CardContent>
            </Card>

        </div>

    );
}

function CardBarFooter() {

    return (
        <Card className='cardContainerFotter' variant="outlined">
            <CardContent className='cardContainerContent'>

                <PieChart data={pieData} className='Pie' radius='50'
                    totalValue={20}
                    paddingAngle={0}
                    radius={50}
                    startAngle={0} />
                <Typography className='cardContainerTitle'  >
                    {window.innerWidth > 828 ? 'You have used 15 out of 20 availiable Uploads' : '15/20 Uploads'}
                </Typography>
            </CardContent>
            <CardActions className='CardBarActions'>
                <Button size="big" variant="contained" className='UpgradeBtn'>Upgrade</Button>
            </CardActions>
        </Card>
    )
}
function Dashboard({ history }) {
    function PersistentDrawerLeft() {
        const mobileDrawer = window.innerWidth > 861;
        const classes = useStylesDrawer();
        const theme = useTheme();
        const [open, setOpen] = useState(mobileDrawer);
        let User = useSelector((state) => state.persistedStore.message);
        const dispach = useDispatch()

        async function LogOut() {
            //Logout happens

            let res = await fetch(process.env.REACT_APP_API_BASE + "/account/rest-api/logout", {
                method: "GET",
                credentials: "include",
                withCredentials: true
            });
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
                                    {User.usernames}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#">Dashboard</Dropdown.Item>
                                    <Dropdown.Item href="/#/videos">Videos</Dropdown.Item>
                                    <Dropdown.Item href="/#/settings">Settings</Dropdown.Item>
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
                        <img src={Logo} onClick={() => { history.replace('/dashboard') }} style={{
                            cursor: "pointer",
                            justifyContent: "space-between",
                            maxHeight: "50px",
                            maxWidth: "50px",
                            marginRight: "auto",
                            marginLeft: "auto",
                        }} />
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List style={{ paddingTop: "0px" }}>
                        {
                            (


                                <>
                                    <ListItem button key={1} style={{ backgroundColor: "#f7c9b8" }}>
                                        <ListItemIcon style={{ color: "black" }}>{<AssignmentTurnedInSharpIcon />}</ListItemIcon>
                                        <ListItemText primary="Dashboard" />
                                    </ListItem>
                                    <ListItem button onClick={() => { history.replace("/videos") }} key={2} >
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





                    <Grid container >

                        <Grid className='cardsContainerRes' item xs={6} >
                            <Grid container spacing={1} >
                                <Grid item xs={6}>
                                    <OutlinedCard title={'Completed Uploads'} number={12} />
                                </Grid>
                                <Grid item xs={6}>
                                    <OutlinedCard title={'Running Uploads'} number={4} />
                                </Grid>
                                <Grid item xs={6}>
                                    <OutlinedCard title={'Failed Uploads'} number={3} />
                                </Grid>
                                <Grid item xs={6}>
                                    <OutlinedCard title={'Upload Limit'} number={20} />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={6} className='cardsContainerRes' >
                            <AcordionBar />
                            <AcordionNotification />
                        </Grid>
                        <Grid item xs={12} className='cardFooter' >
                            <CardBarFooter />
                        </Grid>
                    </Grid>





                </main>
            </div>
        );
    }
    return (
        <div>
            <PersistentDrawerLeft />
        </div>
    )
}

export default Dashboard
