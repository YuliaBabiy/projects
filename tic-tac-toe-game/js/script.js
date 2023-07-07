const tiles = new Array(9).fill(undefined);
const tileElmts = document.querySelectorAll('.col');
const resEl = document.getElementById('res');
let mark = true; // true - X, false - O

console.log(tiles);

tileElmts.forEach((tileEl, index) => tileEl.onclick = (event) => {
  if (tiles[index] !== undefined) { return; }

  tiles[index] = mark ? 'x' : 'o';

  mark = !mark;
  // render data on page
  tileEl.classList.add(mark ? 'cross' : 'null');

  // _logValues();

  checkIfGameOver();
});

function showWinner(winner) {
  let endGameMsg = 'draw';

  if (winner === 'x') {
    endGameMsg = 'player 1 win!';
  }

  if (winner === 'o') {
    endGameMsg = 'player 2 win!';
  }

  resEl.innerHTML = endGameMsg;
}

// let allNotUndefined = false;

// function allTileFull() {
  
//   tileElmts.forEach((tileEl, index) => {
//     if (tiles[index] !== undefined) {
//       allNotUndefined = true;
//     }
//   })

//   return allNotUndefined;
// }

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

function checkIfGameOver() {
  if (tiles[0] && tiles[1] && tiles[2] &&
      tiles[0] === tiles[1] && tiles[1] === tiles[2]
    ) {
    return showWinner(tiles[0]);
  }

  if (tiles[3] && tiles[4] && tiles[5] &&
    tiles[3] === tiles[4] && tiles[4] === tiles[5]
    ) {
    return showWinner(tiles[3]);
  }

  if (tiles[6] && tiles[7] && tiles[8] &&
    tiles[6] === tiles[7] && tiles[7] === tiles[8]
    ) {
    return showWinner(tiles[6]);
  }

  if (tiles[0] && tiles[3] && tiles[6] &&
    tiles[0] === tiles[3] && tiles[3] === tiles[6]
    ) {
    return showWinner(tiles[0]);
  }

  if (tiles[1] && tiles[4] && tiles[7] &&
    tiles[1] === tiles[4] && tiles[4] === tiles[7]
    ) {
    return showWinner(tiles[1]);
  }

  if (tiles[2] && tiles[5] && tiles[8] &&
    tiles[2] === tiles[5] && tiles[5] === tiles[8]
    ) {
    return showWinner(tiles[2]);
  }

  if (tiles[0] && tiles[4] && tiles[8] &&
    tiles[0] === tiles[4] && tiles[4] === tiles[8]
    ) {
    return showWinner(tiles[0]);
  }

  if (tiles[2] && tiles[4] && tiles[6] &&
      tiles[2] === tiles[4] && tiles[4] === tiles[6]) {
    return showWinner(tiles[2]);
  }

  if (tiles.indexOf(undefined) === -1 && tiles.length === 9) {
    showWinner();
  }
}
