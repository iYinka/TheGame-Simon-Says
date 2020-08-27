// function nextSequence(){
//   var randomNumber = Math.round(Math.random() * 3);
//   return randomNumber;
//  }
// randomNumber = nextSequence();
// console.log(randomNumber);   Testing with Chrome Developer Tools


var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern= [];

var started = false; /*You'll need a way to keep track of whether if the game has
 started or not, so you only call nextSequence() on the first keypress.*/

var level = 0; //2. Create a new variable called level and start at level 0.

$(document).keypress(function(){ //2. Create a new variable called level and start at level 0.
	if(!started){

//3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
		$("#level-title").text("Level" + " " + level);
		nextSequence();
		started = true;
	}
});





$(".btn").click(function(){
		var userChosenColor = $(this).attr("id");
		userClickedPattern.push(userChosenColor);
		playSound(userChosenColor);
		animatePress(userChosenColor);


		checkAnswer(userClickedPattern.length - 1); /*2. Call checkAnswer() after a user has clicked and chosen their 
		answer, passing in the index of the last answer in the user's sequence.*/
	});

function checkAnswer(currentLevel){
	if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){  /*Write an if statement inside checkAnswer()
	 										to check if the most recent user answeris the same as the game pattern. 
	 										If so then log "success", otherwise log "wrong".*/
		console.log("success");
	
	if(userClickedPattern.length === gamePattern.length){  /*If the user got the most recent answer right in step the "if statement above",
									then check that they have finished their sequence with another if statement.*/
		
		setTimeout(function(){// Call nextSequence() after a 1000 millisecond delay.

			nextSequence();
		}, 1000);
	}
	
} else{
			var audio = new Audio("sounds/wrong.mp3");
				audio.play();
			$("h1").html("Game Over, Press Any Key To Restart");

			$("body").addClass("game-over");
			setTimeout(function(){
				$("body").removeClass("game-over");
			}, 200);
			console.log("wrong");

		//Reset game after Wrong answer
		startOver();
		}
	}


function nextSequence(){

	userClickedPattern = []; //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
	level++;
	$("#level-title").text("Level" + " " + level);

  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
   gamePattern.push(randomChosenColor);

   //Selecting color with same ID as randomChosenColor with jQuery
	$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColor);

 }




 //nextSequence();

function playSound(name){
	var audio = new Audio("sounds/" + name +".mp3");
			audio.play();
}


function animatePress(currentColor){

	$("#" + currentColor).addClass("pressed");
	setTimeout(function(){
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}



function startOver(){
	level = 0;
	gamePattern = [];
	started = false;
}



