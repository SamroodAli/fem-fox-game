export const TICK_RATE = 3000;
export const ICONS = ["fish", "poop", "weather"];
export const RAIN_CHANCE = 0.2;
export const SCENES = ["day", "rain", "dead"];
export const DAY_LENGTH = 60;
export const NIGHT_LENGTH = 4;

//random number between 0 and 2 and add 5 => random between 5 and 7
export const getNextHungerTime = (clock) => {
  return Math.floor(Math.random() * 3) + 5 + clock;
};

export const getNextDieTime = (clock) => {
  return Math.floor(Math.random() * 2) + 3 + clock;
};
