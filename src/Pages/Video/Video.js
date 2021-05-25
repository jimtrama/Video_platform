import React, { useState } from 'react'
import Replay10Icon from '@material-ui/icons/Replay10';

function Video({ location }) {
    const [goVideo, setgoVideo] = useState(false);
    function getUrlParameter(sParam) {
        const queryString = decodeURIComponent(location.search.substring(1));
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(sParam);
    };
    if (!goVideo) {
        let link = getUrlParameter('id');
        fetch("http://privy-rabbit.club" + link, { method: "GET", referrerPolicy: "origin", referrer: "http://yashtest.tk", redirect: 'follow' },
        ).then(res => res.json()).then(data => {
            console.log(data);

            fetch("http://privy-rabbit.club" + data.fullLink, { method: "GET", referrerPolicy: "origin", referer: "http://yashtest.tk", redirect: 'follow' }).then(res => res.blob()).then(srcVideo => {
                let source = document.getElementById("player_html5_api");
                console.log(srcVideo);

                let url = URL.createObjectURL(srcVideo);
                console.log(url);
                source.src = url;
                setgoVideo(true);


            })

        })
    }
    const changeRate = (rate) => {
        document.getElementById("player_html5_api").playbackRate = rate;
    }
    let playing = true;
    const changePayingStatus = () => {
        // console.log(document.getElementById("player_html5_api").paused);
        // if (playing == true) {
        //     pause();
        //     playing = false;
        // } else {
        //     play();
        //     playing = true;

        // }
        if (document.querySelector(".vjs-control-bar > button[title='Play']")) {
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
        document.getElementById("player_html5_api").currentTime = document.getElementById("player_html5_api").currentTime - 4
    }
    const forward = () => {
        document.getElementById("player_html5_api").currentTime = document.getElementById("player_html5_api").currentTime + 4
    }
    return (
        <>
            <button onClick={play}>PLay</button>
            <button onClick={forward}>F</button>
            <button onClick={rewind}>B</button>
            <Replay10Icon />
            <video id="player" class="video-js" controls preload="auto" width="640" height="264" data-setup="{}">

                <p class="vjs-no-js">
                    To view this video please enable JavaScript, and consider upgrading to a
                    web browser that
      <a href="https://videojs.com/html5-video-support/" target="_blank"
                    >supports HTML5 video</a
                    >
                </p>
            </video>
        </>
    )
}

export default Video
