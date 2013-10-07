window.onload = function() {

	console.log("what does this do?");
	console.log("oh, it prints text to the console. swag");
	var links = document.getElementsByTagName("a");
	for(var i in links){
		if(links[i].style)
			links[i].style.color = "pink";
	}
	var paragraphs = document.getElementsByTagName("p");
	var shade = 255;
	for(var i in paragraphs){
		if(paragraphs[i].style) {
			paragraphs[i].style.backgroundColor = 'rgb('+shade+', '+shade+', '+shade+')';
			shade -= 255/paragraphs.length;
			shade = Math.floor(shade);
		}
	}
	document.getElementById("poly3").style.display = 'none';
}