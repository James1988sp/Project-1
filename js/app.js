console.log('Js loaded');
$(() => {

  const $start = $('#startgame');
  const $timer = $('#timer');
  const $question = $('#question');
  const $submit = $('#submit');
  const $answer = $('input[type="text"]');
  const $op = ['+', '-', '*', '/'];
  const $select = $('select');
  let chosenLevel = 'normal';
  let timerId;
  let time = 10;
  let computerAnswer = null;
  let $cells = $('li');
  let randomCells = null;
  let operator = '+';
  let first = null;
  let second = null;
  let max = 10;


  $start.on('click', startGame);
  $submit.on('click', (e) => {
    if($(e.target).text() === 'Submit') {
      checkAnswer();
    } else {
      resetGame();
    }

  });

// Function that start the game, check and hide left and left2 timer start create questions and #batman song play
  function startGame() {
    check();
    $submit.html('Submit');
    $('.left2').hide();
    $('.left').css('display', 'block');
    startTimer();
    generateSum();
    $('#batman').get(0).play();

  }
// Function that make timer start and also create loose condition #gameover play
  function startTimer() {
    timerId = setInterval(() => {
      time--;
      $timer.html(time);
      if (!time) {
        clearInterval(timerId);
        gameOver();
        $('#gameover').get(0).play();
      }
    }, 1000);
  }
 // Function that create win condition
  function playerHasWon() {
    return $('li.hidden').length === $('li').length;
  }
 // Function that check userAnswer and computerAnswer
  function checkAnswer() {
    const  userAnswer = parseFloat($answer.val());
    $cells = $('li').not('.hidden');
    randomCells = $cells.eq(Math.floor(Math.random() * $cells.length));

    if (userAnswer === computerAnswer) {
      randomCells.addClass('hidden');
      $('#robin').get(0).play();

      if(playerHasWon()) {
        clearInterval(timerId);
        $submit.html('Play again?');
        return $question.html('You Won!');
      }

      generateSum();
      time += 3;

    } else if (userAnswer !== computerAnswer) {
      const $hiddenCells = $('li.hidden');
      const $randomHiddenCell = $hiddenCells.eq(Math.floor(Math.random() * $hiddenCells.length));
      $randomHiddenCell.removeClass('hidden');
    } else {
      clearInterval(timerId);
    }
    $answer.val('');
  }
 // Function that  run the end of the game
  function gameOver() {
    clearInterval(timerId);
    $question.html('Game Over!');
    $submit.html('Play again?');

  }
 // Function that check which level you choose and create questions based on choosen level
  function check() {
    chosenLevel = $select.val();
    return generateSum(chosenLevel);
  }
 // Function that generate questions
  function generateSum() {
    operator = $op[Math.floor(Math.random() * $op.length)];
    if (chosenLevel === 'normal'){
      operator = '+';
      max = 10;
    } else if (chosenLevel === 'genius') {
      max = 100;
    } else {
      max = 1000;
    }

    first = Math.ceil(Math.random() * max);
    second = Math.ceil(Math.random() * max);
    $question.html(`${first} ${operator} ${second} = ?`);

    switch(operator) {
      case '+':
        computerAnswer = first + second;
        break;
      case '-':
        computerAnswer = first - second;
        break;
      case '/':
        computerAnswer = first / second;
        break;
      case '*':
        computerAnswer = first * second;

    }
  }

  function resetGame() {
    time = 10;
    $timer.html(time);
    $cells = $('li');
    $cells.removeClass('hidden');
    startGame();

  }

  $('form').on('submit', (e) => {
    e.preventDefault();
  });

});
