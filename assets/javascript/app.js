// Questions and Answers
var questions = [
    {
        // Question #1
        question: 'When you see livestock near the roadway, you should',
        answers: [
            { answer: 'A. Turn safely away from these animals.', value: false },
            { answer: 'B. Blow your horn continuously until the animals cross the road.', value: false },
            { answer: 'C. Follow directions from the person in charge of the animals.', value: true },
            { answer: "D. Signal the person in charge of the animals to move right.", value: false }
        ]
    },
    {
        // Question #2
        question: 'When two vehicles meet on a steep mountain road where neither can pass, which vehicle has the right-of-way?',
        answers: [
            { answer: 'The vehicle that comes first', value: false },
            { answer: 'The vehicle traveling uphill', value: true },
            { answer: 'Both vehicles', value: false },
            { answer: 'The vehicle traveling downhill', value: false }
        ]
    },
    {
        // Question #3
        question: 'If you are in an intersection and you hear the siren of an emergency vehicle, you should',
        answers: [
            { answer: 'continue through the intersection, then move to the right and stop', value: true },
            { answer: 'move to the right and stop in the intersection', value: false },
            { answer: 'move to the left and stop in the intersection', value: false },
            { answer: 'continue through the intersection, then move to the left and stop', value: false }
        ]
    },
    {
        // Question #4
        question: 'Use __________ steering when correcting a skid.',
        answers: [
            { answer: 'hand-by-hand', value: false },
            { answer: 'one-hand', value: false },
            { answer: 'hand-over-hand', value: true },
            { answer: 'push-pull', value: false }
        ]
    },
    {
        // Question #5
        question: 'When you want to enter a freeway, you should',
        answers: [
            { answer: 'stop and yield to the traffic on the freeway', value: false },
            { answer: 'enter the freeway at a minimum speed', value: false },
            { answer: 'stop before merging onto freeway traffic', value: false },
            { answer: 'enter the freeway at or near the speed of freeway traffic', value: true }
        ]
    },
    {
        // Question #6
        question: 'Locked wheel skids are usually caused by',
        answers: [
            { answer: 'leaking motor oil.', value: false },
            { answer: 'turning the ignition to the lock position while the vehicle is still in motion.', value: false },
            { answer: 'braking too hard at a high speed.', value: true },
            { answer: 'pressing the gas and brake pedals at the same time', value: false }
        ]
    },
    {
        // Question #7
        question: 'If a person is convicted of causing serious bodily injury when trying to evade a peace officer, the maximum imprisonment is',
        answers: [
            { answer: '3 years', value: false },
            { answer: '7 years', value: true },
            { answer: '2 years', value: false },
            { answer: '5 years', value: false }
        ]
    },
    {
        // Question #8
        question: 'A traffic signal with a flashing yellow arrow means that you should',
        answers: [
            { answer: 'proceed with caution.', value: true },
            { answer: 'stop and be prepared to obey the next signal.', value: false },
            { answer: 'proceed with caution but turns are not permitted in the direction of the arrow.', value: false },
            { answer: 'proceed at increased speed as directed by the arrow.', value: false }
        ]
    },
    {
        // Question #9
        question: 'A driver in front of you is signaling with his or her hand and arm pointing upward. This driver wants to',
        answers: [
            { answer: 'stop', value: false },
            { answer: 'slow down', value: false },
            { answer: 'turn left', value: false },
            { answer: 'turn right', value: true }
        ]
    },
    {
        // Question #10
        question: 'To avoid tailgating, one should follow the',
        answers: [
            { answer: 'two second rule', value: false },
            { answer: 'four second rule', value: false },
            { answer: 'five second rule', value: false },
            { answer: 'three second rule', value: true }
        ]
    }        
];
  
// Global variables
var game;
  var counter = 0;
  var clock;
  var timer = 30;
  var correctCounter = 0;
  var incorrectCounter = 0;
  var unansweredCounter = 0;
  
$(document).ready(function() {
  // Start the game when that start button is clicked
  $('.answers').css('visibility', 'hidden');
  $('body').on('click', '.start-btn', function(event) {
    event.preventDefault();
    startGame();
    $('.answers').css('visibility', 'visible');
  });
  
$('body').on('click', '.answer', function(event) {
  chosenAnswer = $(this).text();
  var answerCounter = questions[counter].answers;
  
  var answer = $('.answer');
    for (var i = 0; i < answerCounter.length; i++) {
      if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === true) {
        clearInterval(clock);
        var right = $(this).attr('class', 'right-answer answer');
        rightAnswer();
      } else if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === false) {
        clearInterval(clock);
        $(this).attr('class', 'wrong-answer answer');
        $('.right-answer').css('background-color', 'green');
        $('.right-answer').css('color', 'white');
        wrongAnswer();
      }
    }
  });
  
  $('body').on('click', '.reset-button', function(event) {
    event.preventDefault();
    resetGame();
  });
});
  
function rightAnswer() {
  correctCounter++;
  $('.time').html(timer);
  $('.right').html('<p>Right answers: ' + correctCounter + '</p><br>');
  setTimeout(questionCounter, 2000);
}
  
function wrongAnswer() {
  incorrectCounter++;
  $('.time').html(timer);
  $('.wrong').html('<p>Wrong answers: ' + incorrectCounter + '</p>');
  setTimeout(questionCounter, 2000);
}
  
function unanswered() {
  unanswered++;
  $('.main').append("<p class='times-up'>Time's up!</p>");
  $('.right-answer').css('background-color', 'green');
  $('.times-up')
    .delay(2000)
    .fadeOut(400);
  setTimeout(questionCounter, 2000);
}
  
function startGame() {
  $('.start-page').css('display', 'none');
  $('.questions-page').css('visibility', 'visible');
  $('.timer').html('<p>Time remaining: <span class="time">30</span></p>');
  
  $('.question').html(questions[counter].question);
  var showingAnswers =
    '<p class="answer righ-answer">' +
    questions[counter].answers[0].answer +
    '</p><p class="answer">' +
    questions[counter].answers[1].answer +
    '</p><p class="answer">' +
    questions[counter].answers[2].answer +
    '</p><p class="answer">' +
    questions[counter].answers[3].answer +
    '</p>';
  
  $('.answers').html(showingAnswers);
  
  timerHolder();
}
  
function questionCounter() {
  if (counter < 9) {
    counter++;
    startGame();
    timer = 30;
    timerHolder();
  } else {
    finishGame();
  }
}
  
  // Timer
function timerHolder() {
  clearInterval(clock);
  clock = setInterval(seconds, 1000);
  function seconds() {
    if (timer === 0) {
      clearInterval(clock);
      unanswered();
    } else if (timer > 0) {
      timer--;
    }
    $('.time').html(timer);
  }
}
  
// End Game
function finishGame() {
  var final = $('.main')
    .html("<p>Congratulations on finishing!<p><br><br>")
    .append('<p>Correct Answers: ' + correctCounter + '</p><br>')
    .append('<p>Wrong Answers: ' + incorrectCounter + '</p>');
  $(final).attr('<div>');
  $(final).attr('class', 'final');
  $('.final').append('<p><a class="btn btn-primary btn-lg reset-button" href="#">Restart the game!</a></p>');
}
  
// Game Reset
function resetGame() {
  counter = 0;
  correctCounter = 0;
  incorrectCounter = 0;
  unansweredCounter = 0;
  timer = 30;
  startGame();
  timerHolder();
}