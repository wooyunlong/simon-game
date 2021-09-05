let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).on("keydown", function () {
  if (!started) {
    setTimeout(function () {
      $("h1").text("level " + level);
      nextSequence();
      started = true;
    }, 500);
  }
});

$(".btn").on("click", (e) => {
  if (started) {
    let userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function nextSequence() {
  userClickedPattern = [];
  $("h1").text("level " + level);

  const buttonColours = ["red", "blue", "green", "yellow"];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;
  playSound(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

function playSound(name) {
  let audioUrl = "";
  switch (name) {
    case "red":
      audioUrl = "sounds/red.mp3";
      break;
    case "blue":
      audioUrl = "sounds/blue.mp3";
      break;
    case "green":
      audioUrl = "sounds/green.mp3";
      break;
    case "yellow":
      audioUrl = "sounds/yellow.mp3";
      break;
  }
  new Audio(audioUrl).play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("sounds/wrong.mp3");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  gamePattern = [];
  started = false;
  level = 0;
}
