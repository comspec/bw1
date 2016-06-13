/*global $*/
var videos;

function listVideos(category) {
  "use strict";
	$(".container").empty();

  $.each(videos, function (key, video) {
    if (category === video.Category) {
      $("<div class='col-sx-6 col-sm-6 col-md-3 col-lg-4'><div class='panel previewbox'>" + "<p class='previewdescription'>" + encodeURI(video.Description) + "</p>" + "<img class='previewimage' src='" + encodeURI(video.ImageURL) + "'></img><span>" + video.Name + "</span></div></div>").appendTo(".container");
    }
  });
}

function loadVideos() {
  "use strict";
	$.getJSON("videos.json", function (data) {
    videos = data;
    listVideos("A"); //beginner intermediate advanced
  });
}

$(function () {
  "use strict";
	var modal = $(".modalDialog"),
      timer = $("#runner"),
      player = $("#player");

	loadVideos();
  timer.runner();

	$(".navbar-nav > li > a").click(function (e) {
		e.preventDefault();
		var menuItem = $(this);

		if (!menuItem.parent().hasClass("active")) {
			$(".navbar-nav > li").removeClass("active");
			menuItem.parent().addClass("active");
			listVideos(e.currentTarget.hash.substr(1));
		}
	});

	$(".container").on("click", "img", function (e) {
		e.preventDefault();

		if (modal.css("opacity") === "0") {
      timer.runner("reset", true);

			if (player.get(0).paused === true && player.prop("src") === this.src.replace("png", "mp4")) {
        player.get(0).play();
				modal.css("opacity", 1);
			} else {
				player.prop("src", this.src.replace("png", "mp4"));
				player.get(0).load();
				player.get(0).play();
				modal.css("opacity", 1);
			}

      timer.runner("start");
		}
	});

	$(document).on('click', function (e) {
		e.preventDefault();

    if (modal.css("opacity") === "1" && player.get(0).paused === false) {
      timer.runner("stop");
      player.get(0).pause();
      modal.css("opacity", 0);
    }
	});

  /*$("#player").on("timeupdate", function (e) {
    //console.log(this.currentTime + " / " + this.duration);
  });*/
});
