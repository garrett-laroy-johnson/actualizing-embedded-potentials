let hubs = [];
let keys;
let w = window.innerWidth;
let h = window.innerHeight;
let ft;
let txtSize = 30;
let fonts = ["Dawning of a New Day", "Sacramento", "Waiting for Sunrise"];
let numLines;
let colors = [];
let alpha = 255;

function preload() {
  // num of get keys;
  keys = Object.keys(info);
  for (k = 0; k < keys.length; k++) {
    let name = keys[k];
    let o = new Hub(k, name);
    let numImg = info[name];
    for (p = 0; p < numImg; p++) {
      let img = loadImage(`./${name}/${name}${p+1}.JPG`);
      let i = new Node(img, o.x, o.y, k, p);
      o.nodes.push(i);
    }
    hubs.push(o);
  }
}

function setup() {
  createCanvas(w, keys.length * h);
  getColor();
  textSize(txtSize);
  textWrap(WORD);
  noFill();
  strokeWeight(3);
  stroke(0, 100);
  rectMode(CENTER);
  imageMode(CENTER);
}

function getColor() {
  for (let h of hubs) {
    for (let n of h.nodes) {
      let s = n.img.get(randomGaussian(100, 50), randomGaussian(100, 50));
      let c = color(s[0], s[1], s[2], alpha)
      n.color = c;
    }
  }
}

function draw() {
  background(255);
  // draw squiggle
  noFill();
  //show images + text
  for (let hub of hubs) {
    for (let node of hub.nodes) {
      rectMode(CENTER);
      node.show();
      node.squiggle();
    }
  }
  noStroke();
  rectMode(CORNER);
  for (let hub of hubs) {
    let col = hub.nodes[0].color;
    col[3] = 0.1;
    fill(255, 100);
    rect(width / 2, hub.y, width / 2, h / 3)
    fill(0, 255);
    textFont(random(fonts));
    text(txt[hub.name], width / 2, hub.y, width / 2, h / 2)
  }
  noLoop();
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
  constructor(img, x, y, hi, ni) {
    this.pos = createVector(random(x, x + 500), random(y - 300, y + 600));
    this.img = img;
    this.r = 250;
    this.color;
    this.nI = ni;
    this.hI = hi;
  }
  show() {
    this.edges();
    tint(255, 200)
    image(this.img, this.pos.x, this.pos.y, this.r, this.r)
  }
  squiggle() {
    noFill();
    strokeWeight(randomGaussian(3, 2));
    stroke(this.color);
    beginShape();
    curveVertex(hubs[this.hI].nodes[this.nI].pos.x, hubs[this.hI].nodes[this.nI].pos.y)
    for (let h = this.hI; h < hubs.length; h++) {
      for (let n = this.nI; n < hubs[h].nodes.length; n++) {
        let no = noise(h * 0.1, n * 0.1);
        no = map(no, 0, 1, -200, 200);
        curveVertex(hubs[h].nodes[n].pos.x + no, hubs[h].nodes[n].pos.y + no);
      }
    }
    curveVertex(hubs[hubs.length - 1].x, hubs[hubs.length - 1].y)
    endShape();
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