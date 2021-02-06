//named descriptive functions because it helps in debugging in stack trace and better for readability
// descriptive named functions are assigned to const variables and exported
export const changeFoxState = function changeFoxState(state) {
  document.querySelector(".fox").className = `fox fox-${state}`;
};
export const changeWeatherScene = function changeWeatherScene(state) {
  document.querySelector(".game").className = `game ${state}`;
};

export const togglePoopBag = function togglePoopBag(show) {
  //if show == true, hidden == false and vice versa, so hidden = not show or !show
  document.querySelector(".poop-bag").classList.toggle("hidden", !show);
};
