'use strict';
// Selecting elements
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const name0 = document.querySelector('#name--0');
const name1 = document.querySelector('#name--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Base State
score0.textContent = 0;
score1.textContent = 0;
diceImg.classList.add('hidden');

//Global variables
let diceNum = 0;
let player1 = 1;
let player2 = 0;

// Active player

//Functions
const rollDice = function () {
  diceNum = Math.trunc(Math.random() * 6 + 1);
  console.log(diceNum);
};
const toggler = function () {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
let roller = function () {
  if (player1) {
    rollDice();
    diceImg.src = `dice-${diceNum}.png`;
    diceImg.classList.remove('hidden');
    if (diceNum === 1) {
      toggler();
      current0.textContent = -1;
      player1--;
      player2++;
    }
    current0.textContent = Number(current0.textContent) + diceNum;
  } else if (player2) {
    rollDice();
    diceImg.src = `dice-${diceNum}.png`;
    diceImg.classList.remove('hidden');
    if (diceNum === 1) {
      toggler();
      current1.textContent = -1;
      player2--;
      player1++;
    }
    current1.textContent = Number(current1.textContent) + diceNum;
  }
};

let holder = function () {
  toggler();
  if (player1) {
    score0.textContent =
      Number(score0.textContent) + Number(current0.textContent);
    current0.textContent = 0;
    if (score0.textContent >= 100) {
      player0El.classList.add('player--winner');
      name0.style.color = '#c7365f';
      btnHold.removeEventListener('click', holder);
      btnRoll.removeEventListener('click', roller);
    }
    player1--;
    player2++;
  } else if (player2) {
    score1.textContent =
      Number(score1.textContent) + Number(current1.textContent);
    current1.textContent = 0;
    if (score1.textContent >= 100) {
      player1El.classList.add('player--winner');
      name1.style.color = '#c7365f';
      btnHold.removeEventListener('click', holder);
      btnRoll.removeEventListener('click', roller);
    }
    player2--;
    player1++;
  }
};

//Event listeners

// ROLLER

btnRoll.addEventListener('click', roller);

// HOLDER

btnHold.addEventListener('click', holder);

// NEW
btnNew.addEventListener('click', function () {
  player1 = 1;
  player2 = 0;
  btnRoll.addEventListener('click', roller);
  btnHold.addEventListener('click', holder);
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  diceImg.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  name0.style.fontWeight = 'bold';
  name1.style.fontWeight = 'normal';
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
});
