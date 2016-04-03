$(function() {
	var modal = $(".modalDialog");
	var player = $("#player");

	$(".previewbox").on("click", "img", function(e) {
		e.preventDefault();

		if (modal.css("opacity") === "0") {

			if (player.get(0).paused === true && player.prop("src") === this.src.replace("jpg", "mp4")) {
				player.get(0).play();
				modal.css("opacity", 1);
			} else {
				player.prop("src", this.src.replace("jpg", "mp4"));
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

	$("#player").on("timeupdate", function(e) {
      console.log(this.currentTime + " / " + this.duration);
    });
});