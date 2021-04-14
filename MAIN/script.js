"use strict";

//document.addEventListener("DOMContentLoaded", function () {
// code...

const overlay = document.querySelector(".overlay");
const btnsOpenModal = document.querySelectorAll("[class^=show-modal]"); //Class starting with show-modal

const openModal = function (modal_var) {
  // console.log("Button clicked");
  modal_var.classList.remove("hidden");
  overlay.classList.remove("hidden");
  modal_var.querySelector("button").addEventListener("click", function () {
    closeModal(modal_var);
  });

  overlay.addEventListener("click", function () {
    closeModal(modal_var);
  });

  document.addEventListener("keydown", function (e) {
    //Close modal on escape
    // console.log(e.key);
    if (e.key === "Escape") {
      closeModal(modal_var);
    }
  });
};

const closeModal = function (modal_var) {
  modal_var.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 1; i <= btnsOpenModal.length; i++) {
  // let _thisBtn = btnsOpenModal[i - 1];
  let _thisModal = document.querySelector(".modal" + i);

  btnsOpenModal[i - 1].addEventListener("click", function () {
    //Attach event on click
    openModal(_thisModal);
  });
}
//////////////////////////////////Another way of solving it
/* 
"use strict";

//document.addEventListener("DOMContentLoaded", function () {
// code...
const modal1 = document.querySelector(".modal1");
console.log(modal1);
const modal2 = document.querySelector(".modal2");

const modal3 = document.querySelector(".modal3");
const overlay = document.querySelector(".overlay");

const btnCloseModal1 = document.querySelector(".close-modal1");
const btnCloseModal2 = document.querySelector(".close-modal2");
const btnCloseModal3 = document.querySelector(".close-modal3");
const btnsOpenModal1 = document.querySelector(".show-modal1");
const btnsOpenModal2 = document.querySelector(".show-modal2");
const btnsOpenModal3 = document.querySelector(".show-modal3");

const openModal1 = function () {
  console.log("Button clicked");
  modal1.classList.remove("hidden");
  overlay.classList.remove("hidden");
  btnCloseModal1.addEventListener("click", closeModal1);
  overlay.addEventListener("click", closeModal1);
};

const openModal2 = function () {
  console.log("Button clicked");
  modal2.classList.remove("hidden");
  overlay.classList.remove("hidden");
  btnCloseModal2.addEventListener("click", closeModal2);
  overlay.addEventListener("click", closeModal2);
};
const openModal3 = function () {
  console.log("Button clicked");
  modal3.classList.remove("hidden");
  overlay.classList.remove("hidden");
  btnCloseModal3.addEventListener("click", closeModal3);
  overlay.addEventListener("click", closeModal3);
};

const closeModal1 = function () {
  modal1.classList.add("hidden");
  overlay.classList.add("hidden");
};
const closeModal2 = function () {
  modal2.classList.add("hidden");
  overlay.classList.add("hidden");
};
const closeModal3 = function () {
  modal3.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal1.addEventListener("click", openModal1);
btnsOpenModal2.addEventListener("click", openModal2);
btnsOpenModal3.addEventListener("click", openModal3);
// for (let i = 0; i < btnsOpenModal1.length; i++) {
// console.log("adding " + i);
// btnsOpenModal1[i].addEventListener("click", openModal1);
//   console.log("added " + i);
// }

document.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "Escape" && !modal1.classList.contains("hidden")) {
    closeModal1();
  }
  if (e.key === "Escape" && !modal2.classList.contains("hidden")) {
    closeModal2();
  }
  if (e.key === "Escape" && !modal3.classList.contains("hidden")) {
    closeModal3();
  }
});
 */
