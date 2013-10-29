window.onload = function() {
	var myBox = $(".box");
	var x = 0;
	var y = 0;
	var direction = 39;
	var speed = 10;
	var turbo = 0;

	var $food = $('<div class="food">').appendTo("body");
	$food.css({left: "100px", top: "100px"});

	function addTrail(){
		var $food = $('<div class="trail">').appendTo("body");
		$food.css({left: x+45+"px", top: y+45+"px"})
	}

	function moveBox(dir){
		if(dir !== 32){
			direction=dir;
		}
		if(dir === 37){
			if(x >= speed){
				addTrail()
				x-=speed;
			}
			else{
				x=0;
			}
		}
		else if(dir === 38){
			if(y >= speed){
				addTrail()
				y-=speed;
			}
			else{
				y=0;
			}
		}
		else if(dir === 39){
			if(x <= $(document).width()-speed-$(".box").width()){
				addTrail()
				x+=speed;
			}
			else{
				x=document.width-$(".box").width();
			}
		}
		else if(dir === 40){
			if(y <= $(document).height()-speed-$(".box").height()){
				addTrail()
				y+=speed;
			}
			else{
				y=document.height-$(".box").height();
			}
		}
		else if(dir === 32){
			if(turbo === 0){
				$(".box").css({color: "white", backgroundColor: "rgba(200,50,2,1)"});
				turbo=1;
				console.log("here");
				clearInterval(moveInterval);
				moveInterval = setInterval(function() { moveBox(direction); checkCollision(); }, 20);
			}
			else{
				turbo=0;
				$(".box").css({color: "transparent", backgroundColor: "transparent", backgroundImage: "url(\"./images/grumpycat.png\")"});
				clearInterval(moveInterval);
				moveInterval = setInterval(function() { moveBox(direction); checkCollision(); }, 100);
			}
		}
		$(".box").css({top: y, left: x})

	}

	function checkCollision(){
		if(x+90 >= $food.offset().left && x-20 <= $food.offset().left && y+90 >= $food.offset().top && y-20 <= $food.offset().top) {
			$food.css({top: Math.random()*$(document).height() + "px", left: Math.random()*($(document).width()-20) + "px"});
		}
	}

	var moveInterval = setInterval(function() { 
		moveBox(direction); 
		checkCollision(); 
	}, 100);
	$(document).keydown(function(e){
		var dir = e.which;
		moveBox(dir);
	});
	$(".speedbutton").click(function(e){
		var input = prompt("Enter a speed from 1 to 10.");
		speed = Number(input)*10;
	});
}