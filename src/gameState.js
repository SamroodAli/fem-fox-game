import { changeFoxState, changeScene } from "./ui";
import {
  RAIN_CHANCE,
  SCENES,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextDieTime,
  getNextHungerTime,
} from "./constants";

const gameState = {
  current: "INIT",
  clock: 1,
  //these could also be undefined,only initializing variable here
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,

  // tick function
  tick() {
    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
    } else if (this.clock === this.dieTime) {
      this.die();
    }
    this.clock++;
    console.log("clock", this.clock);
    // waking up the fox
    return this.clock;
  },
  // start game function and wake up function
  startGame() {
    this.current = "HATCHING";
    this.wakeTime = this.clock + 1; //delay after hatching
    changeFoxState("egg");
    changeScene("day");
  },
  wake() {
    //waking up
    this.current = "IDLING";
    changeFoxState("idling");
    //rain or not
    const DAY_CHANCE = Math.random();
    this.scene = DAY_CHANCE > RAIN_CHANCE ? 0 : 1; //0 - Day, 1 - Rain, RAIN_CHANCE from constants.js
    changeScene(SCENES[this.scene]);
    //updating times
    this.wakeTime = -1; //turning off wakeTime
    this.sleepTime = this.clock + DAY_LENGTH; //next sleep time which is after a day
    this.hungryTime = getNextHungerTime(this.clock); //nest time to be hungry
  },
  sleep() {
    this.current = "SLEEP";
    changeFoxState("sleep");
    changeScene("night");
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },
  getHungry() {
    this.current = "HUNGRY";
    this.dieTime = getNextDieTime(this.clock);
    changeFoxState("hungry");
    this.hungryTime = -1;
  },
  die() {
    this.current = "DEAD";
    changeFoxState("dead");
    changeScene(SCENES[2]);
    this.dieTime = -1;
  },
  // function to handle user Actions on buttons
  handleUserAction(icon) {
    // ignore any button clicks (icons) if the fox is sleeping, feeding , celebrating or hatching
    if (
      ["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"].includes(this.current)
    ) {
      //do nothing
      return;
    }
    // if current state is in init or dead, start new game
    if (this.current === "INIT" || this.current === "DEAD") {
      this.startGame();
      return;
    }
    // connecting buttons(when respective icons) to their respective event handlers down below
    switch (icon) {
      case "weather":
        this.changeWeather();
        break;
      case "poop":
        this.cleanUpPoop();
        break;
      case "fish":
        this.feed();
        break;
    }
  },
  // button events handlers
  changeWeather() {
    console.log("changeWeather");
  },
  cleanUpPoop() {
    console.log("cleanUpPoop");
  },
  feed() {
    console.log("feed");
  },
};
//binding handleUserAction's 'this' to gameState regardless of the context handleUserAction is executed
export const handleUserAction = gameState.handleUserAction.bind(gameState);
export default gameState;
