"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-11-28T09:15:04.904Z",
    "2020-12-01T10:17:24.185Z",
    "2021-03-08T14:11:59.604Z",
    "2021-04-08T17:01:17.194Z",
    "2021-04-10T23:36:17.929Z",
    "2021-04-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "GBP",
  locale: "en-GB",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
//------------------ ELEMENTS-----------------------

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const logindetails = document.querySelector(".logindetails");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////////////////
//---------------------------FUNCTIONS---------------------

//*********************************************************
//DATE FUNCTION
//*********************************************************
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

//---------------------------------------------------------
//*********************************************************
//FORMATTING CURRENCIES
//*********************************************************
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

//---------------------------------------------------------
//*********************************************************
//DISPLAY ENTRIES(MOVEMENTS)IN HTML
//*********************************************************
const displayMovements = function (acc, sort = false) {
  //empty the container
  containerMovements.innerHTML = ""; //or use .textContent = 0;

  //sorting the movements.Use slice to take a copy n do sorting
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
       <div class="movements__date">${displayDate}</div>  
        <div class="movements__value">${formattedMov}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//---------------------------------------------------------
//*********************************************************
//CALCULATE DIPLAY BALANCE
//*********************************************************
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

//---------------------------------------------------------
//*********************************************************
//CALCULATE THE SUMMARY---INCOME/OUTCOME/INTEREST---
//*********************************************************
const calcDisplaySummary = function (acc) {
  //incomes
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  //outcome
  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(
    Math.abs(outcomes),
    acc.locale,
    acc.currency
  );
  //interest
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100) //interest rate as per user
    .filter((int, i, arr) => {
      return int >= 1;
    }) //new rule: bank only pays interest if its mote than 1
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
  console.log(interest);
}; //abs remove - sign

//---------------------------------------------------------
//*********************************************************
//CALCULATE SHORT USERNAME FOR LOGIN USE
//*********************************************************
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    //create new property
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (name) {
        return name[0];
      })
      .join("");
  });
};

createUsernames(accounts);

//---------------------------------------------------------
//*********************************************************
//UPDATE UI
//*********************************************************
const updateUI = function (acc) {
  //display movements
  displayMovements(acc);
  //display balance
  calcDisplayBalance(acc);
  //display summary
  calcDisplaySummary(acc);
  // console.log('LOGGED IN');
};

//START LOGOUT TIMER

const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0); //remainder
    //In each callback call print the remaining time to the user interface
    labelTimer.textContent = `${min}: ${sec}`;

    //When we reach 0 sec, stop timer and logout user.
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = "Log in to get started";
    }
    //Decrease a sec
    time--;
  };
  //Setting the time to 5 mins
  let time = 120;

  //Call timer every sec
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
//********************************************************
//----------------------EVENT HANDLERS---------------------
let currentAccount, timer; //GLOBAL VARIABLES

//LOGIN FUNCTIONALITY
//*********************************************************
btnLogin.addEventListener("click", function (e) {
  //stop page reload i.e. prevent form from submitting on clicking submit button
  e.preventDefault();
  //find user account
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  ); //check pin for login
  // console.log(currentAccount);
  //?. optional chaining used for checking if there is no account
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display UI and welcome msg
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100; //all content visible

    //create current date and time
    //using Internationalizing dates
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };

    // const loacle = navigator.language;
    // console.log(loacle);
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    /* const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;*/

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //timer
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    //update UI
    updateUI(currentAccount);
  }
});

//---------------------------------------------------------
//*********************************************************
//TRANSFER MONEY FUNCTIONALITY
//*********************************************************
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  //clear transfer interface
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //add transfer dates
    currentAccount.movementsDates.push(new Date());
    receiverAcc.movementsDates.push(new Date());
    //update UI
    updateUI(currentAccount);
    //reset the timer

    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

//---------------------------------------------------------
//*********************************************************
//LOAN FEATURE (loan granted only if deposit is > than 10% of the requested amount)
//*********************************************************
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      //add the movement
      currentAccount.movements.push(amount);
      //add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      //update UI
      updateUI(currentAccount);
    }, 2500); //2.5 seconds timer for loan approval
    //reset the timer

    clearInterval(timer);
    timer = startLogoutTimer();
  }
  //clear input fiels
  inputLoanAmount.value = "";
});

//---------------------------------------------------------
//*********************************************************
//CLOSE ACCOUNT
//*********************************************************
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    //delete account
    accounts.splice(index, 1);
    //hide UI
    containerApp.style.opacity = 0;
  }
  //clear fields
  inputCloseUsername.value = inputClosePin.value = "";
});

//---------------------------------------------------------
//*********************************************************
//SORTING OF MOVEMENTS
//*********************************************************
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

//---------------------------------------------------------

/////////////////////////////////////////////////
/////////////////////////////////////////////////
