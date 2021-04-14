"use strict";

// console.log(document.querySelector(".message").textContent);
// document.querySelector(".message").textContent = "Correct Number! 🥰";
// document.querySelector(".number").textContent = 13;
// document.querySelector(".score").textContent = 10;

// document.querySelector(".guess").value = 20;
// console.log(document.querySelector(".guess").value);

///GAME LOGIC....
//define the secret number
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

//display secret number at ?
// document.querySelector(".number").textContent = secretNumber;

//code refactoring for the diaplay message
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  //   console.log(guess, typeof guess);

  if (!guess) {
    // document.querySelector(".message").textContent =
    //   "⛔️No number! Please enter a number between 1 and 20.";
    displayMessage("⛔️No number! Please enter a number between 1 and 20.");
  }

  //when player wins i.e. guess is same as secret number
  else if (guess === secretNumber) {
    // document.querySelector(".message").textContent =
    //   "🏆 Hurray! You guessed it right! ";
    displayMessage("🏆 Hurray! You guessed it right! ");
    //display secret number
    document.querySelector(".number").textContent = secretNumber;
    //change background color
    document.querySelector(".message").style.backgroundColor = "white";
    //change text color
    document.querySelector(".message").style.color = "black";
    //change background image
    document.querySelector("body").style.backgroundImage =
      "url(images/win.jpg)";
    //change width of box
    document.querySelector(".number").style.width = "30rem";
    //check high score
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  }
  //when guess is different from secret number (code refactoring)
  else if (guess !== secretNumber) {
    if (score > 1) {
      //   document.querySelector(".message").textContent =
      //     guess > secretNumber
      //       ? "📈 It's Higher than the correct number. "
      //       : "📉 It's Lower than the correct number.";
      displayMessage(
        (document.querySelector(".message").textContent =
          guess > secretNumber
            ? "📈 Your guess is higher than the correct no. "
            : "📉 Your guess is lower than the correct no.")
      );
      score--;
      document.querySelector(".message").style.backgroundColor = "white";
      document.querySelector(".message").style.color = "red";
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "You lost the game "; //
      displayMessage("You lost the game ");
      document.querySelector(".score").textContent = 0;
    }
  }

  //   //when guess is high
  //   else if (guess > secretNumber) {
  //     if (score > 1) {
  //       document.querySelector(".message").textContent =
  //         "📈 It's Higher than the correct number. ";
  //       score--;
  //       document.querySelector(".score").textContent = score;
  //     } else {
  //       document.querySelector(".message").textContent = "You lost the game ";
  //       document.querySelector(".score").textContent = 0;
  //     }
  //   } //when guess is low
  //   else if (guess < secretNumber) {
  //     if (score > 1) {
  //       document.querySelector(".message").textContent =
  //         "📉 It's Lower than the correct number.";
  //       score--;
  //       document.querySelector(".score").textContent = score;
  //     } else {
  //       document.querySelector(".message").textContent = "You lost the game ";
  //       document.querySelector(".score").textContent = 0;
  //     }
  //   }
});
//for again button

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".message").textContent = "Start guessing.... ";
  // displayMessage("Start guessing.... ");
  document.querySelector("body").style.backgroundImage =
    "url(images/transBackdrop3.png)";
  document.querySelector(".message").style.backgroundColor = "black";
  document.querySelector(".message").style.color = "white";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
});
