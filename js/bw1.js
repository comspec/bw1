$(function() {
	$(".modalDialog").prop("opacity", 0.2);

	$(".previewbox").on("click", "img", function(e) {
		e.preventDefault();

		var player = $("#player");
		player.prop("src", this.src.replace("jpg", "mp4"));
		player.get(0).load();
		player.get(0).play();

		//$(".modalDialog").prop("opacity", 1);
		//$(".modalDialog").addClass("modalDialog");
		//$(".modalDialog").addClass("video");
		//$(".modalDialog").prop("visibility", "visible");
	});

	$("#player").on("timeupdate", function(e) {
      console.log(this.currentTime + " / " + this.duration);
    });
});