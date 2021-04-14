"use strict";
//selecting elements

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1"); //bit faster than query selector
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const pigImg = document.querySelector(".pig");
const rules = document.querySelector(".rules");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing; //global scope

//starting conditions...initialization for new game
const init = function () {
  scores = [0, 0]; //scoring main scores here at position 1 and 2
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  rules.classList.remove("hidden");
  pigImg.classList.remove("hidden");
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
//initial page load function call
init();

//switch player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //re-set current score to 0
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //re-assign the active player
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. display the dice
    diceEl.classList.remove("hidden");
    pigImg.classList.add("hidden");
    rules.classList.add("hidden");

    diceEl.src = `SUB/GAMES/pig-game/images/dice-${dice}.png`;
    //3. check for a rolled 1 and if true switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      // current0El.textContent = currentScore;
    } else {
      //switch to another player
      switchPlayer();
    }
  }
});

//Button Hold functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    //1.add curret socre to the score of active player
    // console.log('hold button');
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] +currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check socre >=100

    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add("hidden");
      // pigImg.classList.remove("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
  //4.switch to next player
});

btnNew.addEventListener("click", init);
