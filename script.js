"use strict";

//document.addEventListener("DOMContentLoaded", function () {
// code...
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

const openModal = function () {
  console.log("Button clicked");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  btnCloseModal.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  console.log("adding " + i);
  btnsOpenModal[i].addEventListener("click", openModal);
  console.log("added " + i);
}
//});
