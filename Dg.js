const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const Current0El = document.querySelector("#current--0");
const Current1El = document.querySelector("#current--1");
let scores, currentScore, activePlayer, playing;
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  Current0El.textContent = 0;
  Current1El.textContent = 0;
  scores = [0, 0];

  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add("hidden");
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
//function swtich player
const swtichPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document.getElementById(`current--${activePlayer}`).style.backgroundColor =
    "red";
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
//rolling dice function
btnRoll.addEventListener("click", function () {
  //1.generating random dice
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);
  //2.Display dice
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;
  //3.check the roll dice is 1:if true,
  if (dice !== 1) {
    //add dice to current score
    currentScore += dice;
    /*  Current0El.textContent = currentScore; //chanege later */
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    document.getElementById(`current--${activePlayer}`).style.backgroundColor =
      "";
  } else {
    //  #Swtich to next player
    swtichPlayer();
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document.classList.remove("player--active");
    } else {
      // Switch to the next player
      swtichPlayer();
    }
  }
});
btnNew.addEventListener("click", init);
