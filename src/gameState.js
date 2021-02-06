const gameState = {
  current: "INIT",
  clock: 1,
  tick() {
    this.clock++;
    console.log("clock", this.clock);
    return this.clock;
  },
  handleUserAction(icon) {
    console.log(icon);
  },
};

export default gameState;
