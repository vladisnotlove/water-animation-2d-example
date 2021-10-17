import {WaterAnimation2d} from 'water-animation-2d';

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const waterAnimation2d = new WaterAnimation2d(canvas);

  waterAnimation2d.run();
})