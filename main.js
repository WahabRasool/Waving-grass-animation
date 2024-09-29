const canvasElement = document.getElementById("grass");
const canvasContext = canvasElement.getContext("2d");
canvasContext.imageSmoothingEnabled = false;

let grassBlades = [];
let amplitude = 1.6;
let speed = 0.05;
let offset = 1;

const puppetImage = new Image();
puppetImage.src = 'https://png.pngtree.com/png-vector/20220611/ourmid/pngtree-scarecrow-straw-straw-man-clipping-path-vector-png-image_37165776.png';

function drawBlade(
  startX,
  startY,
  controlPointX1,
  controlPointY1,
  controlPointX2,
  controlPointY2,
  endX,
  endY,
  swayAmount
) {
  canvasContext.beginPath();
  canvasContext.moveTo(startX, startY);
  canvasContext.bezierCurveTo(controlPointX1, controlPointY1, controlPointX2, controlPointY2, endX, endY);
  canvasContext.strokeStyle = "green";
  canvasContext.lineWidth = 3;
  canvasContext.stroke();
}

function drawGrassScene() {
  canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

  canvasContext.drawImage(puppetImage, 150, 120, canvasElement.width / 2, canvasElement.height / 1.5);

  if (grassBlades.length === 0) {
    for (let i = 0; i < 350; i++) {
      const randomX = Math.random() * canvasElement.width;
      const startY = canvasElement.height;
      const controlPointX1 = randomX - Math.random() * 30;
      const controlPointY1 = startY - Math.random() * 100;
      const controlPointX2 = randomX + Math.random() * 30;
      const controlPointY2 = startY - Math.random() * 150;
      const endX = randomX;
      const endY = startY - Math.random() * 200;
      const randomSway = Math.random() * 0.5 - 0.25;

      grassBlades.push({
        startX: randomX,
        startY,
        controlPointX1,
        controlPointY1,
        controlPointX2,
        controlPointY2,
        endX,
        endY,
        swayAmount: randomSway
      });
    }
  }

  for (let i = 0; i < grassBlades.length; i++) {
    const blade = grassBlades[i];
    blade.controlPointX1 += Math.sin(offset) * amplitude;
    blade.controlPointX2 += Math.sin(offset + 1) * amplitude;
    blade.endX += Math.sin(offset + 0) * amplitude;

    drawBlade(
      blade.startX,
      blade.startY,
      blade.controlPointX1,
      blade.controlPointY1,
      blade.controlPointX2,
      blade.controlPointY2,
      blade.endX,
      blade.endY,
      blade.swayAmount
    );
  }

  offset += speed;
  requestAnimationFrame(drawGrassScene);
}

puppetImage.onload = drawGrassScene;