const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

let isAutoPlay = false;
let intervalId;

updateScoreElement(score);

const autoPlayBtn = document.querySelector('#auto-play');

const confirmMsg = document.querySelector('#confirm-msg');

document.querySelector('#yes-btn')
 .addEventListener('click', resetScore);

document.querySelector('#no-btn')
  .addEventListener('click', () => {
    confirmMsg.classList.remove('show-msg');
  });

document.querySelector('#auto-play')
  .addEventListener('click', autoPlay);

document.querySelector('#reset-score')
  .addEventListener('click', () => {
    confirmMsg.classList.add('show-msg');
  });

document.querySelector('.js-rock-btn')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-btn')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-btn')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', onKeyDown);

function onKeyDown({ key }) {
  if (key === 'r') {
    playGame('rock');
  }

  if (key === 'p') {
    playGame('paper');
  }

  if (key === 's') {
    playGame('scissors');
  }

  if (key === 'a') {
    autoPlay();
  }

  if (key === 'Backspace') {
    resetScore();
  }
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement(score);
  confirmMsg.classList.remove('show-msg');
}

function autoPlay() {
  if (isAutoPlay) {
    clearInterval(intervalId);
    autoPlayBtn.innerHTML = 'Auto Play';
    isAutoPlay = false;

    return;
  }

  autoPlayBtn.innerHTML = 'Stop Playing';
  intervalId = setInterval(() => {
    playGame();
  }, 1000);

  isAutoPlay = true;
}

function playGame(playerMove = getRandomMove()) {
  const computerMove = getRandomMove();
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    }
    if (computerMove === 'paper') {
      result = 'You win.';
    }
    if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  }

  if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    }
    if (computerMove === 'paper') {
      result = 'Tie.';
    }
    if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  }

  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    }
    if (computerMove === 'paper') {
      result = 'You lose.';
    }
    if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins++;
  }

  if (result === 'You lose.') {
    score.losses++;
  }

  if (result === 'Tie.') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  showResult(result);
  updateScoreElement(score);
  moveElement(playerMove, computerMove);
}

function updateScoreElement(score) {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// TODO: make this function not dependant on text itself
function showResult(result) {
  document.querySelector('.js-result')
    .innerHTML = result;
}

function moveElement(playerMove, computerMove) {
  document.querySelector('.js-moves')
  .innerHTML = `You
    <img class="move-icon" src="./img/${playerMove}-emoji.png">
    <img class="move-icon" src="./img/${computerMove}-emoji.png">
    Computer`;
}

function getRandomMove() {
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    return 'rock';
  }

  if (randomNumber >= 1 /3 && randomNumber < 2 / 3 ) {
    return 'paper';
  }

  if (randomNumber >= 2 / 3 && randomNumber < 1) {
    return 'scissors';
  }
}