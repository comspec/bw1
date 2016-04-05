var videos;

$(function() {
	var modal = $(".modalDialog");
	var player = $("#player");
	
	loadVideos(); //beginner intermediate advanced
    listVideos("beginner");

	$(".navbar-nav > li > a").click(function(e) {
		e.preventDefault();
		var menuItem = $(this);

		if (!menuItem.parent().hasClass("active")) {
			$(".navbar-nav > li").removeClass("active");
			menuItem.parent().addClass("active");
			listVideos(e.currentTarget.hash.substr(1));
		}
	});
	
	$(".container").on("click", "img", function(e) {
		e.preventDefault();

		if (modal.css("opacity") === "0") {

			if (player.get(0).paused === true && player.prop("src") === this.src.replace("png", "mp4")) {
				player.get(0).play();
				modal.css("opacity", 1);
			} else {
				player.prop("src", this.src.replace("png", "mp4"));
				player.get(0).load();
				player.get(0).play();

				modal.css("opacity", 1);
			}
		}
	});

	$(document).on('click', function(e){
		e.preventDefault();

        if (modal.css("opacity") === "1" && player.get(0).paused === false) {
        	player.get(0).pause();
			modal.css("opacity", 0);
        }
	});

	/*$("#player").on("timeupdate", function(e) {
      console.log(this.currentTime + " / " + this.duration);
    });*/
});

function loadVideos() {
	$.getJSON("videos.json", function (data) {
        videos = data;
        listVideos("beginner");
    });
}

function listVideos(category) {
	$(".container").empty();

    $.each(videos, function (key, video) {
        if ((category === "beginner" && video.Category === "A") || (category === "intermediate" && video.Category === "B") || (category === "advanced" && video.Category === "C")) {
            console.log(key, video)
            $("<div class='col-sx-6 col-sm-6 col-md-3 col-lg-4'><div class='panel previewbox'><img class='previewimage' src='" + video.ImageURL + "'></img><span>" + video.Name + "</span></div></div>").appendTo(".container");
        }
    });
}