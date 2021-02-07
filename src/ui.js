//assigning named functions instead of arrow functions because it helps in debugging in stack trace and better for readability
export const changeFoxState = function changeFoxState(state) {
  document.querySelector(".fox").className = `fox fox-${state}`;
};
export const changeScene = function changeScene(state) {
  document.querySelector(".game").className = `game ${state}`;
};

export const togglePoopBag = function togglePoopBag(show) {
  //if show == true, hidden == false and vice versa, so hidden = not show or !show
  document.querySelector(".poop-bag").classList.toggle("hidden", !show);
};

export const writeModal = function writeModal(text = "") {
  //if text is empty(default) , modal wont be displayed as we have set modal display none using modal:empty selector
  document.querySelector(
    ".modal"
  ).innerHTML = `<div class="modal-inner">${text}</div>`;
};
