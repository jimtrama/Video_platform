import React, { useState } from 'react'
import { useEffect } from 'react';
import "./video.css"
import back from './../../Images/rewind.png';
import forwardI from './../../Images/forward.png';
import speed from './../../Images/speed.png';
import close from './../../Images/close.png';


let values = {
    0.25: 0,
    0.5: 1,
    1: 2,
    1.5: 3,
    2: 4,
}

function Video({ location }) {
    window.addEventListener('load', (e) => {

        let sitearray = (/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/).exec(e.target.referrer);
        try {
            setSite("http://" + sitearray[0]);
        } catch (e) {

        }


    })
    const [goVideo, setgoVideo] = useState(false);
    const [site, setSite] = useState("");
    const [url, setUrl] = useState("");
    function getUrlParameter(sParam) {
        const queryString = decodeURIComponent(location.search.substring(1));
        const urlParams = new URLSearchParams(queryString);

        return urlParams.get(sParam);
    };

    useEffect((e) => {

        let link = getUrlParameter('id');

        if (site) {
            let myHeaders = new Headers();
            myHeaders.append("site", site)
            myHeaders.append("Access-Control-Request-Headers", "site")

            fetch(process.env.REACT_APP_API_BASE + "/playback/" + link, {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            },
            ).then(res => res.text()).then(data => {

                let linkSource = "";
                for (let i = data.indexOf('src="') + 5; ; i++) {
                    if (data[i] == '"')
                        break;
                    linkSource += data[i];

                }
                let metaOne = "";
                for (let i = data.indexOf('<head>'); i < data.indexOf('</head>'); i++) {

                    metaOne += data[i]
                }
                metaOne += "</head>";
                let source = document.getElementById("player_html5_api");
                //let urlT = URL.createObjectURL(data);
                source.src = process.env.REACT_APP_API_BASE + linkSource//urlT;
                let metaTag = document.createElement('div');
                metaTag.innerHTML = metaOne
                document.getElementById('root').appendChild(metaTag);
                document.querySelector(".vjs-big-play-button").addEventListener('click', play);
                //document.getElementById("player_html5_api").removeEventListener('dblclick', () => { });
                //document.getElementById("player_html5_api").ondblclick = youtubeFunc;
                //document.getElementById("player_html5_api").onfullscreenchange = changeFullscreenStatus;

                document.getElementById("player_html5_api").addEventListener('click', youtubeFunc);
                setgoVideo(true);
                renderControls();
                //setUrl(urlT)

            })
        }



    }, [site])


    const youtubeFunc = (e) => {
        let width = e.target.offsetWidth;
        let parts = width / 3;
        let midleft = parts;
        let midright = parts * 2;

        if (e.x < midleft) {

            rewind()
            play()
        } else if (midright < e.x) {

            forward()
            play();
        } else {

            changePayingStatus()

        }

    }
    const changeRate = (rate) => {

        document.getElementById('modalSpeed').classList.add('hide')
        document.getElementsByClassName("speedline selected")[0].classList.remove("selected")
        document.getElementsByClassName("speedline")[values[rate]].classList.add("selected")

        document.getElementById("player_html5_api").playbackRate = rate;


    }
    const changePayingStatus = () => {
        if (document.querySelector(".vjs-control-bar > button[title='Play']") || document.querySelector(".vjs-control-bar > button[title='Replay']")) {
            play();
        } else {
            pause();
        }
    }
    const play = () => {
        if (document.querySelector(".vjs-control-bar > button")) {
            document.querySelector(".vjs-control-bar > button").addEventListener('click', changePayingStatus)
        }
        document.getElementById("player_html5_api").play()
    }
    const pause = () => {
        document.getElementById("player_html5_api").pause()
    }

    const rewind = () => {
        document.getElementById('prevImgCont').classList.add("fadePrev")
        setTimeout(() => {
            document.getElementById('prevImgCont').classList.remove("fadePrev")
        }, 800)
        document.getElementById("player_html5_api").currentTime = document.getElementById("player_html5_api").currentTime - 10
    }
    const forward = () => {
        document.getElementById('forwImgCont').classList.add("fadeFrow")
        setTimeout(() => {
            document.getElementById('forwImgCont').classList.remove("fadeFrow")
        }, 800)
        document.getElementById("player_html5_api").currentTime = document.getElementById("player_html5_api").currentTime + 10
    }
    const showSpeed = () => {
        document.getElementById('modalSpeed').classList.toggle('hide')
    }
    const renderControls = () => {
        let nodeForward = document.createElement('div')
        nodeForward.className = "imgCont"
        nodeForward.onclick = forward;
        nodeForward.innerHTML = `<img class="rewindImg" src="${forwardI}"></img>`
        document.querySelector(".vjs-control-bar").insertBefore(nodeForward, document.querySelector(".vjs-control-bar > div"))
        document.querySelector(".imgCont").addEventListener('click', forward);


        let node = document.createElement('div')
        node.className = "imgCont"
        node.onclick = rewind;
        node.innerHTML = `<img class="rewindImg" src="${back}"></img>`
        document.querySelector(".vjs-control-bar").insertBefore(node, document.querySelector(".vjs-control-bar > div"))


        //vjs-picture-in-picture-control

        let nodeSpeedCont = document.createElement('div');
        nodeSpeedCont.className = "imgMainCont"
        let nodeSpeed = document.createElement('img')
        nodeSpeed.className = "imgCont"
        nodeSpeed.onclick = showSpeed;
        nodeSpeed.src = speed;

        let nodeSpeedMenu = document.createElement('div')
        nodeSpeedMenu.className = "modalSpeed hide"
        nodeSpeedMenu.id = "modalSpeed"
        nodeSpeedMenu.onclick = showSpeed;
        nodeSpeedMenu.innerHTML = `
            <div style="display:flex;width:100%;margin-bottom:13px;justify-content: space-between;align-items:center;"> <span style="font-style:italic;">Speed</span> <img style="width:10px;height:10px;" src="${close}" ></img>  </div>
            <span class="speedline" >0.25</span>
            <span class="speedline" >0.50</span>
            <span class="speedline selected" >1.0</span>
            <span class="speedline" >1.5</span>
            <span class="speedline" >2.0</span>
        `


        nodeSpeedCont.appendChild(nodeSpeed)
        nodeSpeedCont.appendChild(nodeSpeedMenu)

        let nodePrev = document.createElement('div');
        nodePrev.className = "prevImgCont"
        nodePrev.id = "prevImgCont"
        nodePrev.innerHTML = `
        <img className="prevImg" src="${back}"></img>
        <div className="opacityHelpRight" />
        `
        let nodeFrow = document.createElement('div');
        nodeFrow.className = "forwImgCont";
        nodeFrow.id = "forwImgCont";
        nodeFrow.innerHTML = `
        <div className="opacityHelpLeft" />
        <img className="forwImg" src="${forwardI}"></img>
        `


        document.querySelector(".vjs-control-bar").insertBefore(nodeSpeedCont, document.querySelector(".vjs-picture-in-picture-control"))
        document.getElementById('player').insertBefore(nodeFrow, document.getElementsByTagName('video')[0])
        document.getElementById('player').insertBefore(nodePrev, document.getElementsByTagName('video')[0])
        document.getElementsByClassName("speedline")[0].onclick = () => { changeRate(0.25) }
        document.getElementsByClassName("speedline")[1].onclick = () => { changeRate(0.5) }
        document.getElementsByClassName("speedline")[2].onclick = () => { changeRate(1) }
        document.getElementsByClassName("speedline")[3].onclick = () => { changeRate(1.5) }
        document.getElementsByClassName("speedline")[4].onclick = () => { changeRate(2) }

    }

    return (
        <div className="mainContVideo">

            <video onLoadedData={() => { URL.revokeObjectURL(url); }} id="player"
                className="video-js"
                controls preload="auto" width="640" height="264" data-setup="{}">

            </video>
        </div>
    )
}

export default Video
