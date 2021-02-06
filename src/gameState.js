const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1, //this could also be undefined,only initializing variable here
  tick() {
    this.clock++;
    console.log("clock", this.clock);
    return this.clock;
  },
  // start game function and wake up function
  startGame() {
    console.log("hatching");
    this.current = "HATCHING";
    this.wakeTime = this.clock + 3;
  },
  wake() {
    console.log("awoken");
    this.current = "IDLING";
    this.wakeTime = -1;
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
