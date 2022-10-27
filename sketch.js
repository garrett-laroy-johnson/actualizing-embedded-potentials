let hubs = [];
let keys;
let w = window.innerWidth;
let h = window.innerHeight;
let ft;
let txtSize = 30;
let fonts = ["Dawning of a New Day", "Sacramento", "Waiting for Sunrise"]

function preload() {
  // num of get keys;
  keys = Object.keys(info);
  for (k = 0; k < keys.length; k++) {
    let name = keys[k];
    let o = new Hub(k, name);
    let numImg = info[name];
    for (p = 0; p < numImg; p++) {
      let img = loadImage(`${name}/${name}${p+1}.JPG`);
      let i = new Node(img, o.x, o.y);
      o.nodes.push(i);
    }
    hubs.push(o);
  }
}

function setup() {
  createCanvas(w, keys.length * h);
  textSize(txtSize);
  textWrap(WORD);
  noFill();
  strokeWeight(1);
  stroke(0, 100);
  rectMode(CENTER);
  imageMode(CENTER);
}

function draw() {
  background(255);
  // draw squiggle
  noFill();
  for (s = 0; s < 100; s++) {
    let ind = 0;
    beginShape();
    curveVertex(hubs[0].x, hubs[0].y)
    for (let hub of hubs) {
      ind = 0;
      for (let node of hub.nodes) {
        let n = noise(hub.index * .1, ind * 0.1, s * 0.1);
        n = map(n, 0, 1, -200, 200);
        curveVertex(node.pos.x + n, node.pos.y + n);
        ind++;
      }
    }
    curveVertex(hubs[hubs.length - 1].x, hubs[hubs.length - 1].y)
    endShape();
  }
  //show images + text
  for (let hub of hubs) {
    for (let node of hub.nodes) {
      rectMode(CENTER);
      node.show();
    }
    noStroke();
    rectMode(CORNER);
    let r = random(1);
    if (r < 1) {
      fill(255, 100);
      rect(width / 2, hub.y, width / 2, h / 2)
      fill("black");
      textFont(random(fonts))
      text(txt[hub.name], width / 2, hub.y, width / 2, h / 2)
    } else if (r < 2) {
      fill(255, 100);
      rect(width / 4, hub.y, width / 2, h / 2)
      fill("black");
      text(txt[hub.name], width / 4, hub.y, width / 2, h / 2)
    } else if (r < 3) {
      fill(255, 100);
      rect(0, hub.y, width / 2, h / 2)
      fill("black");
      text(txt[hub.name], 0, hub.y, width / 2, h / 2)
    }
    noLoop();
  }
}
class Hub {
  constructor(index, name) {
    this.name = name,
      this.index = index,
      this.nodes = [],
      this.x = random(125, w - 125);
    this.y = (h / 2 * this.index) + h / 3;
    this.mass = 1;
  }
}
class Node {
  constructor(img, x, y) {
    this.pos = createVector(random(x, x + 500), random(y - 300, y + 600));
    this.img = img;
    this.r = 250;
  }
  show() {
    this.edges();
    tint(255, 200)
    image(this.img, this.pos.x, this.pos.y, this.r, this.r)
  }
  edges() {
    if (this.pos.x <= 0) {
      this.pos.x = 0;
    }
    if (this.pos.x >= width) {
      this.pos.x = width - 250;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, keys.length * h / 2)
}