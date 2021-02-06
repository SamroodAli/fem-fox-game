import { ICONS } from "./constants";

const toggleHighlighted = (icon, isShowIcon) => {
  document
    .querySelector(`${ICONS[icon] - icon}`)
    .classList.toggle("highlighted", isShowIcon);
};

// function to handle user actions
export default function initButtons(handleUserAction) {
  //index of the currently selected icon- closed over variables
  let selectedIconIndex = 0;
  // function clickHandler taking in event.target - destructuring target from event object
  function buttonClick({ target }) {
    if (target.classList.contains("left-btn")) {
      // toggle false current selected icon highlight
      toggleHighlighted(selectedIconIndex, false);
      // select left icon and if at zero(first icon), (2 + 0)%3 == 2; select at index 2,( last icon) essentially creating a loop
      selectedIconIndex = (2 + selectedIconIndex) % ICONS.length;
      // toggle true left selected icon highlight
      toggleHighlighted(selectedIconIndex, true);
    } else if (target.classList.contains("right-btn")) {
      // toggle false current selected icon highlight
      toggleHighlighted(selectedIconIndex, false);
      // select left icon and if at 2nd(last icon), (1 + 2)%3 == 0; select at index 0,(first icon)essentially creating a loop
      selectedIconIndex = (1 + selectedIconIndex) % ICONS.length;
      // toggle true left selected icon highlight
      toggleHighlighted(selectedIconIndex, true);
    } else {
      // middle button - execute handleUserAction and pass in current selected Icon
      handleUserAction(ICONS[selectedIconIndex]);
    }
  }
  document.querySelector(".buttons").addEventListener("click", buttonClick);
}
