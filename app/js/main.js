/*
 * Main JS File
 */

var musicVideos = {
    title: "Billboard Top 40",
    videos: [{
            videoId: "kOCkne-Bku4",
            title: "Paris in The Rain",
            artist: "Lauv"
        },
        {
            videoId: "Mgfe5tIwOj0",
            title: "IDGAF",
            artist: "Dua Lipa"
        },
        {
            videoId: "dfnCAmr569k",
            title: "End Game",
            artist: "Taylor Swift"
        },
        {
            videoId: "LsoLEjrDogU",
            title: "Finesse",
            artist: "Bruno Mars"
        },
        {
            videoId: "WXyLdg4mJxo",
            title: "Naked",
            artist: "James Arthur"
        },
        {
            videoId: "k2qgadSvNyU",
            title: "Naked",
            artist: "James Arthur"
        },
        {
            videoId: "ALZHF5UqnU4",
            title: "Alone",
            artist: "Marshmello"
        }
    ]
}

var mainQueue = new Queue();

musicVideos.videos.forEach((video) => {
    mainQueue.enqueue(video);
});

var previousStack = [];
var nextStack = [];
var videoPlaying;

// var YoutubePlayer = function(){
// 2. This code loads the IFrame Player API code asynchronously.
// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
    var video = mainQueue.dequeue();
    initPlayer(video)
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        // setTimeout(stopVideo, 6000);
        // done = true;
    }
    var state = player.getPlayerState();
    var video;
    if (state === 0) {
        video = mainQueue.dequeue();
        playVideo(video);
    }
    if (state === 1) {
        addToHistory(video);
    }
}


function initPlayer(video) {
    videoPlaying = video;
    player = new YT.Player('player', {
        height: '576',
        width: '1024',
        videoId: video.videoId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'enablejsapi': 1,
            'modestbranding': 1,
            'showinfo': 0,
            'rel': 0,
            'iv_load_policy': 3,
            'ps': 'docs'
        },
    });
}



function stopVideo() {
    player.stopVideo();
}

function playVideo(video) {
    console.log("Playing::", video);
    videoPlaying = video;
    player.loadVideoById(video.videoId, 0, "large");
}


function addToHistory(video) {
    if (!_.includes(previousStack, video)) {
        previousStack.push(video);
    }
}

function addToFuture(video) {
    if (!_.includes(nextStack, video)) {
        nextStack.push(video);
    }
}

$(document).on("ready", function () {
    $("#pause").click(() => {
        player.pauseVideo();
    });

    $("#play").click(() => {
        player.playVideo();
    });

    $("#previous").click(() => {
        player.stopVideo();
        addToFuture(videoPlaying);
        var video = previousStack.pop();

        playVideo(video);
    });

    $("#next").click(() => {
        player.stopVideo();
        addToHistory(videoPlaying);

        var video;
        if (nextStack.length != 0) {
            video = nextStack.pop();
        } else {
            video = mainQueue.dequeue();
        }

        playVideo(video);
    });
});