let info = {
  alys: 25,
}

function preload() {
  // num of get keys;
  for (k = 0; k < num; k++) {
    for (p = 0; p < key; p++) let img = loadImage(`${key} (${p}).jpg`);
    img
  }
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}