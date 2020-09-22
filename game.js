var buttonColors = ['red', 'blue', 'green', 'yellow']

var gamePattern = []
var userClickedPattern = []
var level = 0
var started = false

// game starts when any key is pressed
$(document).keydown(function () {
  if (!started) {
    console.log('key pressed' + event.key)
    nxtSequence()
    $('h1').text('Level ' + level)
    started = true
  }
})

$('.btn').click(function (event) {
  var userChosenColor = event.target.id
  userClickedPattern.push(userChosenColor)

  playSound(userChosenColor)
  animatePress(userChosenColor)

  checkAnswer(userClickedPattern.length - 1)
})

function playSound(color) {
  var audio = new Audio('sounds/' + color + '.mp3')
  audio.play()
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed')

  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed')
  }, 100)
}

// call when user gets sequence correct
function nxtSequence() {
  userClickedPattern = []

  level++
  $('#level-title').text('Level ' + level)

  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColor = buttonColors[randomNumber]
  gamePattern.push(randomChosenColor)

  $('#' + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
  playSound(randomChosenColor)
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success')

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nxtSequence()
      }, 1000)
    }
  } else {
    console.log('wrong')
    playSound('wrong')

    // add background
    $(document.body).addClass('game-over')

    setTimeout(function () {
      $(document.body).removeClass('game-over')
    }, 200)
    $('#level-title').text('Game Over, Press Any Key to Start ')
    startOver()
  }
}

function startOver() {
  level = 0
  started = false
  gamePattern = []
}
