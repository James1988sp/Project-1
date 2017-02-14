console.log('Js loaded');
$(() => {

  const $start = $('#startgame');
  const $timer = $('#timer');
  const $question = $('#question');
  const $submit = $('#submit');
  const $answer = $('input[type="text"]');
  let timerId;
  let time = 10;
  let computerAnswer = null;
  let $cells = $('li');

  const cellIndex = [];
  let previousCell = null;
  let randomCells = null;

  $start.on('click', startGame);
  $submit.on('click', checkAnswer);



  function startGame() {
    $('.left2').hide();
    $('.left').css('display', 'block');
    startTimer();
    generateSum();
  }

  function startTimer() {
    timerId = setInterval(() => {
      time--;
      $timer.html(time);
      if (!time) {
        console.log('Finish');
        clearInterval(timerId);
        gameOver();// gif animata looser
      }
    }, 1000);
  }

  function playerHasWon() {
    return $('li.hidden').length === $('li').length;
  }


  function checkAnswer() {
    const  userAnswer = parseFloat($answer.val());
    $cells = $('li').not('.hidden');
    randomCells = $cells.eq(Math.floor(Math.random() * $cells.length));
    previousCell = cellIndex.push(randomCells);
    console.log(cellIndex[0]);
    if (userAnswer === computerAnswer) {
      randomCells.addClass('hidden');

      if(playerHasWon()) {
        clearInterval(timerId);
        return $question.html('You Won!'); // DEVO METTERE GIF ANIMATA!
      }

      generateSum();
      time += 3;

    } else if (userAnswer !== computerAnswer) {
      previousCell = cellIndex[0];
      previousCell.removeClass('hidden');
      console.log(cellIndex);
    } else {
      clearInterval(timerId);
    }
    $answer.val('');
  }

  function gameOver() {
    clearInterval(timerId);
    $question.html('Game Over!');
    $submit.html('Play again?');
  }

  function generateSum() {
    const first = Math.ceil(Math.random() * 10);
    const second = Math.ceil(Math.random() * 10);
    $question.html(`${first} + ${second} = ?`);
    computerAnswer = first + second;
  }

  function resetGame() {
    time === 10;
    $timer.html(10);
  }
  // $reset.on('click', resetGame);



});
