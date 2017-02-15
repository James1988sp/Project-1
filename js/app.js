console.log('Js loaded');
$(() => {

  const $start = $('#startgame');
  const $timer = $('#timer');
  const $question = $('#question');
  const $submit = $('#submit');
  const $answer = $('input[type="text"]');
  const $op = ['+', '-', '*', '/'];
  const $level = $('.level');
  const $select = $('select');
  let chosenLevel = 'normal';
  let timerId;
  let time = 10;
  let computerAnswer = null;
  let $cells = $('li');
  const cellIndex = [];
  let randomCells = null;
  let operator = '+';
  let first = null;
  let second = null;
  let max = 10;


  $start.on('click', startGame);
  $submit.on('click', (e)=> {
    if($(e.target).text() === 'Submit') {
      checkAnswer();
    } else {
      resetGame();
    }

  });

  function startGame() {
    check();
    $submit.html('Submit');
    $('.left2').hide();
    $('.left').css('display', 'block');
    startTimer();
    generateSum();
    $('#batman').get(0).play();

  }

  function startTimer() {
    timerId = setInterval(() => {
      time--;
      $timer.html(time);
      if (!time) {
        console.log('Finish');
        clearInterval(timerId);
        gameOver();
        $('#gameover').get(0).play();
      }
    }, 1000);
  }

  function playerHasWon() {
    return $('li.hidden').length === $('li').length;
  }

  function checkAnswer() {
    const  userAnswer = parseFloat($answer.val());
    $cells = $('li').not('.hidden');
    //$thiscell = $cells.not('hidden');
    randomCells = $cells.eq(Math.floor(Math.random() * $cells.length));
    console.log(cellIndex[0]);
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

  function gameOver() {
    clearInterval(timerId);
    $question.html('Game Over!');
    $submit.html('Play again?');

  }

  function check() {
    chosenLevel = $select.val();
    console.log(chosenLevel);
    if (chosenLevel==='normal') {
      return generateSum('normal');
    } else if (chosenLevel==='genius') {
      return generateSum('genius');
    } else if (chosenLevel==='savant') {
      return generateSum('savant');
    }
  }

  // function  sumLev() {
  //  //if = $('select[name=selector]').val();
  // }
  // document.getElementsById("stage")[0].onchange = function() {
  //   document.getElementsByid("stage")[0].submit();

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
    //$('li.button');
    //removeClass$('hidden').length === $('li').length;
  }

  $('form').on('submit', (e) => {
    e.preventDefault();
  });
});
