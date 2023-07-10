const score = JSON.parse(localStorage.getItem('score')) || {
  cross: 0,
  null: 0
};

console.log(score);

const tiles = new Array(9).fill(undefined);

const tileElmts = document.querySelectorAll('.col');
const activePlrCross = document.getElementById('active-player-cross');
const activePlrNull = document.getElementById('active-player-null');
const drawEl = document.getElementById('draw');
const crossScoreEl = document.getElementById('cross-score');
const nullScoreEl = document.getElementById('null-score');
const resetScoreEl = document.getElementById('reset-score');
const playAgainEl = document.getElementById('play-again');
const player1El = document.getElementById('player1');
const player2El = document.getElementById('player2');

resetScoreEl.addEventListener('click', () => {
  score.cross = 0;
  score.null = 0;
  localStorage.removeItem('score');
  updateScore();
  playAgain();
});

playAgainEl.addEventListener('click', playAgain);

function playAgain() {
  document.querySelectorAll('.win').forEach(el => el.classList.remove('win'));
  document.querySelector('.tiles-container').classList.remove('game-over');
  mark = true;
  activePlrNull.classList.add('opacity');
  activePlrCross.classList.remove('opacity');
  drawEl.classList.remove('visibility');
  tileElmts.forEach((tileEl, index) => {
    tiles[index] = undefined;
    tileEl.classList.remove('null', 'cross');
    tileEl.classList.remove('opacity');
  });
}

updateScore();
console.log(tiles);

let mark = true; // true - X, false - O

tileElmts.forEach((tileEl, index) => tileEl.onclick = (event) => {
  if (tiles[index] !== undefined) { return; }

  tiles[index] = mark ? 'x' : 'o';

  mark = !mark;
  // render data on page
  tileEl.classList.add(mark ? 'null' : 'cross');

  if (mark) {
    activePlrNull.classList.add('opacity');
    activePlrCross.classList.remove('opacity');
  } else {
    activePlrNull.classList.remove('opacity');
    activePlrCross.classList.add('opacity');
  }

  // _logValues();

  checkIfGameOver();
});



function showWinner(winner) {
  document.querySelector('.tiles-container').classList.add('game-over');
  winTiles.forEach(tile => {
    document.querySelectorAll('.col')[tile].classList.add('win');
  });

  if (winner === 'x') {
    activePlrNull.classList.add('opacity');
    activePlrCross.classList.remove('opacity');

    score.cross++;

    updateScore();
    return;
  }

  if (winner === 'o') {
    activePlrCross.classList.add('opacity');
    activePlrNull.classList.remove('opacity');

    score.null++;
    updateScore();
    return;
  }

  draw();
}

function updateScore() {
  crossScoreEl.innerHTML = score.cross;
  nullScoreEl.innerHTML = score.null;
  localStorage.setItem('score', JSON.stringify(score));
}

function draw() {
  tileElmts.forEach(el => el.classList.add('opacity'));
  activePlrCross.classList.add('opacity');
  activePlrNull.classList.add('opacity');
  winTiles.forEach(tile => {
    document.querySelectorAll('.col')[tile].classList.remove('win');
  });

  drawEl.classList.add('visibility');
}

// проходимся по виграшним тайлам і додаємо кожному клас "win"


let winTiles = [];

function checkIfGameOver() {
  if (tiles[0] && tiles[1] && tiles[2] &&
      tiles[0] === tiles[1] && tiles[1] === tiles[2]
  ) {
    winTiles = [0, 1, 2];
    return showWinner(tiles[0]);
  }

  if (tiles[3] && tiles[4] && tiles[5] &&
    tiles[3] === tiles[4] && tiles[4] === tiles[5]
  ) {
    winTiles = [3, 4, 5];
    return showWinner(tiles[3]);
  }

  if (tiles[6] && tiles[7] && tiles[8] &&
    tiles[6] === tiles[7] && tiles[7] === tiles[8]
  ) {
    winTiles = [6, 7, 8];
    return showWinner(tiles[6]);
  }

  if (tiles[0] && tiles[3] && tiles[6] &&
    tiles[0] === tiles[3] && tiles[3] === tiles[6]
  ) {
    winTiles = [0, 3, 6];
    return showWinner(tiles[0]);
  }

  if (tiles[1] && tiles[4] && tiles[7] &&
    tiles[1] === tiles[4] && tiles[4] === tiles[7]
  ) {
    winTiles = [1, 4, 7];
    return showWinner(tiles[1]);
  }

  if (tiles[2] && tiles[5] && tiles[8] &&
    tiles[2] === tiles[5] && tiles[5] === tiles[8]
  ) {
    winTiles = [2, 5, 8];
    return showWinner(tiles[2]);
  }

  if (tiles[0] && tiles[4] && tiles[8] &&
    tiles[0] === tiles[4] && tiles[4] === tiles[8]
  ) {
    winTiles = [0, 4, 8];
    return showWinner(tiles[0]);
  }

  if (tiles[2] && tiles[4] && tiles[6] &&
      tiles[2] === tiles[4] && tiles[4] === tiles[6]
  ) {
    winTiles = [2, 4, 6];
    return showWinner(tiles[2]);
  }

  if (tiles.indexOf(undefined) === -1 && tiles.length === 9) {
    showWinner();
  }
}

/**
 * Displays grid of values in readable format
 */
// function _logValues() {
//   let res = '';

//   tile.forEach((v, i) => {
//     res += `[ ${v || ' '} ]`;

//     if (i === 2 || i === 5) {
//       res += '\n';
//     }
//   });

//   console.clear();
//   console.log(res);
// }
