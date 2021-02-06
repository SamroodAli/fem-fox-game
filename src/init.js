// imports
import { TICK_RATE } from "./constants";
import initButtons from "./buttons";
import gameState from "./gameState";

// game
function init() {
  console.log("starting game");
  initButtons(gameState.handleUserAction);
  let nextTimeToTick = Date.now();

  // recursive function to che
  function nextAnimationFrame() {
    const now = Date.now();

    if (nextTimeToTick <= now) {
      gameState.tick();
      // requestAnimationFrame is going to be called a lot, so we put to condition to tick only in TICK_RATE time. here 3 seconds
      nextTimeToTick = now + TICK_RATE;
    }
    // using browser API requestAnimation frame to keep running nextAnimationFrame
    requestAnimationFrame(nextAnimationFrame);
  }
  // calling the first tick
  requestAnimationFrame(nextAnimationFrame);
}

init();
