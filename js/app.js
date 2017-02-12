console.log('Js loaded');
$(() => {

  const $start = $('#startgame');
  const $timer = $('#timer');
  const $question = $('#question');
  const $submit = $('#submit');
  const $answer = $('input[type="text"]');
  let time = 10;
  let computerAnswer = null;
  var $cells = $('li');

  $start.on('click', startGame);
  $submit.on('click', checkAnswer);

  function startGame() {
    $('.left2').hide();
    $('.left').css('display', 'block');
    startTimer();
    generateSum();
  }

  function startTimer() {
      //resetGame();
      //toggleBoard();
      //generateSum();
      //$timer.addClass('active');

    const timerId = setInterval(() => {
      time--;
      $timer.html(time);
    }, 1000);

    setTimeout(() => {
      clearInterval(timerId);
      $question.html('Game Over!');
      $submit.html('Play again?');
    }, 10000);
  }

  function checkAnswer() {
    const  userAnswer = parseFloat($answer.val());
    const randomCells = $cells.eq(Math.floor(Math.random() * $cells.length));// sto dando hide una cella a caso da un array pero a volte riseleziona la stessa cella 
    if (userAnswer === computerAnswer) {
      randomCells.hide();
    //  $cells.eq(Math.floor(Math.random() * $cells.length)).hide;
    } else if (userAnswer !== computerAnswer){
      randomCells.show();
    }
    generateSum();
  }


  function generateSum() {
    //$answer.val('');
    const first = Math.ceil(Math.random() * 10);
    const second = Math.ceil(Math.random() * 10);
    $question.html(`${first} + ${second} = ?`);
    computerAnswer = first + second;
  }

});



/*

$cells = $('li');
let userAnswer = '';
let computerAnswer = '';
let operator = ['+', '-', '/', '*'];
//Element needed to create a question
const firstNumber = Math.ceil(Math.random() * 10);
const secondNumber = Math.ceil(Math.random() * 10);
const operator = Math.form(Math.random() + operator.length);

//function to check if userAnswer === computerAnswer
function checkForMatch() {
     const userAnswer = parseFloat($input.val());
     if (computerAnswer === userAnswer) {
       $feedback.html('Correct!');
       userScore++;
     } else {
       $feedback.html('Incorrect!');
       userScore--;
     }
     $score.html(userScore);
     generateSum();



//function to hide one square each time userAnswer === computerAnswer
$cells = $('li');
$cells.eq(Math.floor(Math.random() * $cells.length));
$cells.eq(Math.floor(Math.random() * $cells.length)).add.class('hidden');

*/
