import {WaterAnimation2d} from 'water-animation-2d';

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  const waterAnim = new WaterAnimation2d(canvas);

  waterAnim.run();

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
          x: e.movementX * 100,
          y: e.movementY * 100
        });

        setTimeout(() => {
          waterAnim.cancelForce(id)
        }, waterAnim.deltaTime * 1000 * 5)
      }
    }
  })
})