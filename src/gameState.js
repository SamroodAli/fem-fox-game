import { changeFoxState, changeScene, togglePoopBag, writeModal } from "./ui";
import {
  RAIN_CHANCE,
  SCENES,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextDieTime,
  getNextHungerTime,
  getNextPoopTime,
} from "./constants";

const gameState = {
  current: "INIT",
  clock: 1,
  //these could also be undefined,only initializing variable here
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,
  poopTime: -1,
  timeToStartCelebrating: -1,
  timeToEndCelebrating: -1,
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
    } else if (this.clock === this.timeToStartCelebrating) {
      this.startCelebrating();
    } else if (this.clock === this.timeToEndCelebrating) {
      this.endCelebrating();
    } else if (this.clock === this.poopTime) {
      this.poop();
    }
    this.clock++;
    console.log("clock", this.clock);
    // waking up the fox
    return this.clock;
  },
  // start game function and wake up function
  startGame() {
    writeModal();
    this.current = "HATCHING";
    this.wakeTime = this.clock + 1; //delay after hatching
    changeFoxState("egg");
    changeScene("day");
  },
  wake() {
    //waking up
    this.current = "IDLING";
    //rain or not
    const DAY_CHANCE = Math.random();
    this.scene = DAY_CHANCE > RAIN_CHANCE ? 0 : 1; //0 - Day, 1 - Rain, RAIN_CHANCE from constants.js
    changeScene(SCENES[this.scene]);
    //change fox state to rain or idling mode
    this.determineFoxState();
    //updating times
    this.wakeTime = -1; //turning off wakeTime
    this.sleepTime = this.clock + DAY_LENGTH; //next sleep time which is after a day
    this.hungryTime = getNextHungerTime(this.clock); //nest time to be hungry
    console.log(this.hungryTime, "this is time to be hungry");
  },
  sleep() {
    this.current = "SLEEP";
    changeFoxState("sleep");
    changeScene("night");
    this.clearTimes(); // making sure nothing happens in the night
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },
  getHungry() {
    this.current = "HUNGRY";
    this.dieTime = getNextDieTime(this.clock);
    changeFoxState("hungry");
    this.hungryTime = -1;
  },
  poop() {
    this.current = "POOPING";
    this.poopTime = -1;
    this.dieTime = getNextDieTime(this.clock);
    changeFoxState("pooping");
  },
  die() {
    this.current = "DEAD";
    changeFoxState("dead");
    changeScene("dead");
    this.clearTimes();
    writeModal("The fox died :( <br/> Press the middle button to start");
  },
  startCelebrating() {
    this.current = "CElEBRATING";
    changeFoxState("celebrate");
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = this.clock + 2;
  },
  endCelebrating() {
    this.current = "IDLING";
    this.timeToEndCelebrating = -1;
    this.determineFoxState();
    togglePoopBag(false);
  },
  determineFoxState() {
    if (this.current === "IDLING") {
      if (SCENES[this.scene] === "rain") {
        changeFoxState("rain");
      } else {
        changeFoxState("idling");
      }
    }
  },
  clearTimes() {
    this.wakeTime = -1;
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.poopTime = -1;
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = -1;
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
    this.scene = (this.scene + 1) % 2; // or this.scene === 1 ? 0 : 1 ;
    changeScene(SCENES[this.scene]);
    this.determineFoxState();
    console.log("changeWeather");
  },
  cleanUpPoop() {
    console.log("cleanUpPoop");
    if (this.current !== "POOPING") {
      //do nothing
      return;
    }
    this.dieTime = -1;
    togglePoopBag(true);
    this.startCelebrating();
    this.hungryTime = getNextHungerTime(this.clock);
  },
  feed() {
    console.log("feed");
    if (this.current !== "HUNGRY") {
      //do nothing
      return;
    }
    this.current = "FEEDING";
    this.dieTime = -1;
    changeFoxState("eating");
    this.timeToStartCelebrating = this.clock + 1;
    this.poopTime = getNextPoopTime(this.clock);
  },
};
//binding handleUserAction's 'this' to gameState regardless of the context handleUserAction is executed
export const handleUserAction = gameState.handleUserAction.bind(gameState);
export default gameState;
