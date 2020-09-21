var currentSlide;

$(function () {
  let owl = $(".owl-carousel").owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    items: 1,
    navText: [
      "<span class='arrow left-arrow'><svg width='24' height='44' viewBox='0 0 24 44' xmlns='http://www.w3.org/2000/svg'><path opacity='0.6' fill-rule='evenodd' clip-rule='evenodd' d='M0.708284 19.921L19.8978 0.70841C20.8422 -0.237139 22.373 -0.237139 23.2917 0.70841C24.2361 1.62776 24.2361 3.16088 23.2917 4.10635L5.78605 21.6331L23.2917 39.1597C24.2361 40.1052 24.2361 41.6122 23.2917 42.5577C22.373 43.5031 20.8422 43.5031 19.8978 42.5577L0.7082 23.3189C-0.23608 22.3996 -0.23608 20.8665 0.708284 19.921Z'/></svg></span>",
      "<span class='arrow right-arrow'><svg width='24' height='44' viewBox='0 0 24 44' xmlns='http://www.w3.org/2000/svg'><path opacity='0.6' fill-rule='evenodd' clip-rule='evenodd' d='M0.708284 19.921L19.8978 0.70841C20.8422 -0.237139 22.373 -0.237139 23.2917 0.70841C24.2361 1.62776 24.2361 3.16088 23.2917 4.10635L5.78605 21.6331L23.2917 39.1597C24.2361 40.1052 24.2361 41.6122 23.2917 42.5577C22.373 43.5031 20.8422 43.5031 19.8978 42.5577L0.7082 23.3189C-0.23608 22.3996 -0.23608 20.8665 0.708284 19.921Z'/></svg></span>",
    ],
  });

  owl.on("changed.owl.carousel", function (property) {
    currentSlide = property.item.index;
    if (currentSlide > 0) {
      players[currentSlide - 1].pauseVideo();
      players[currentSlide].playVideo();
    } else if (currentSlide === 0) {
      players[currentSlide + 1].pauseVideo();
      players[currentSlide].playVideo();
    }
  });

  $(".left-arrow").on("click", function () {
    console.log("left-arrow");
  });

  $(".right-arrow").on("click", (e) => {
    e.preventDefault();
    console.log("right-arrow");
  });

  $(window).scroll(() => {
    if (players[currentSlide] && players[currentSlide].pauseVideo) {
      players[currentSlide].pauseVideo();
    }
  });
});

players = new Array();
function onYouTubeIframeAPIReady() {
  let temp = $(".yt_players");
  console.log(temp);
  for (var i = 0; i < temp.length; i++) {
    // (playerId = "player0"), (videoId = "GfKs8oNP9m8");
    var t = new YT.Player($(temp[i]).attr("id"), {
      height: "1920",
      width: "1080",
      videoId: $(temp[i]).data("videoid"),
      playerVars: {
        autoplay: i == 0 ? 1 : 0, // Auto-play the video on load
        autohide: 1,
        disablekb: 1,
        controls: 0, // Hide pause/play buttons in player
        showinfo: 0, // Hide the video title
        modestbranding: 1, // Hide the Youtube Logo
        loop: 1, // Run the video in a loop
        fs: 1, // Hide the full screen button
        autohide: 0, // Hide video controls when playing
        rel: 0,
        enablejsapi: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
    players.push(t);
  }
}

function onPlayerReady(event) {
  if (event.target.l.attributes[0].nodeValue === "player0") {
    event.target.playVideo();
  }
  event.target.setPlaybackQuality("hd1080");
}

var done = false;
function onPlayerStateChange(event) {
  console.log(event);
}

function sizeTheVideo() {
  console.log("test");
  // - 1.78 is the aspect ratio of the video
  // - This will work if your video is 1920 x 1080
  // - To find this value divide the video's native width by the height eg 1920/1080 = 1.78
  var aspectRatio = 1.78;

  var video = $("#player");
  console.log(video.outerHeight());
  var videoHeight = video.outerHeight();
  console.log(videoHeight);
  var newWidth = videoHeight * aspectRatio;
  var halfNewWidth = newWidth / 2;

  //Define the new width and centrally align the iframe
  video.css({
    width: newWidth + "px",
    left: "50%",
    "margin-left": "-" + halfNewWidth + "px",
  });
}
