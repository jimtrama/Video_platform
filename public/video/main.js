


function getUrlParameter(sParam) {
    const queryString = decodeURIComponent(window.location.search.substring(1));
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(sParam);
};


var link = getUrlParameter('id');
console.log(link);
let source = document.getElementById("playerSource");
source.src = link;
let player = videojs('player');
console.log(player);

// let player = document.getElementById("my-video1");
// let player1 = document.getElementById("my-video2");
// player.src = link;
// player1.src = link;



