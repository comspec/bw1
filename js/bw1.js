$(function() {
	var modal = $(".modalDialog");
	var player = $("#player");
	
	$.getJSON("videos.json", function (data) {
        $.each(data, function (key, obj) {
            console.log(key, obj)
            $("<div class='col-sx-6 col-sm-6 col-md-3 col-lg-4'><div class='panel previewbox'><img class='previewimage' src='" + obj.ImageURL + "'></img><span>" + obj.Name + "</span></div></div>").appendTo(".container");
        });
    });
	
	$(".previewbox").on("click", "img", function(e) {
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