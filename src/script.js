import {WaterAnimation2d} from 'water-animation-2d';

const FORCE_COEFF = 100;
const MAX_FORCE = 8000;

const getInRange = (value, range) => {
  if (value < range[0]) return range[0];
  if (value > range[1]) return range[1];
  return value;
}

window.addEventListener("load", () => {

  // get and prepare canvas
  const canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // create water animation
  const waterAnim = new WaterAnimation2d(canvas);
  waterAnim.run();

  // add event handlers for simulating of touching water
  canvas.addEventListener("mousemove", (e) => {
    const canvasRect = canvas.getBoundingClientRect();
    const cur = {
      x: e.clientX - canvasRect.x,
      y: e.clientY - canvasRect.y,
    }
    const prev = {
      x: cur.x - e.movementX,
      y: cur.y - e.movementY
    }

    if (cur.x > 0 && cur.x < canvasRect.right) {
      if (
          waterAnim.isUnderSurface(prev.x, prev.y) && !waterAnim.isUnderSurface(cur.x, cur.y) ||
          !waterAnim.isUnderSurface(prev.x, prev.y) && waterAnim.isUnderSurface(cur.x, cur.y)
      ) {
        const id = waterAnim.applyForce(cur.x, {
          x: getInRange(e.movementX * FORCE_COEFF, [-MAX_FORCE, MAX_FORCE]),
          y: getInRange(e.movementY * FORCE_COEFF, [-MAX_FORCE, MAX_FORCE])
        });

        console.log({
          x: getInRange(e.movementX * FORCE_COEFF, [-MAX_FORCE, MAX_FORCE]),
          y: getInRange(e.movementY * FORCE_COEFF, [-MAX_FORCE, MAX_FORCE])
        });

        setTimeout(() => {
          waterAnim.cancelForce(id)
        }, waterAnim.deltaTime * 1000 * 3)
      }
    }
  })
})