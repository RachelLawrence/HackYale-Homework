window.onload = function() {
	var myBox = $(".box");
	function moveBox(dir){
		if(dir === 37){
			console.log("hur");
			myBox.style.left=3+"px";
		}
	}
	$(document).keydown(function(e){
		var dir = e.which;
		moveBox(dir);
	});
}