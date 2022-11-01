let hubs = [];
let keys;
let w = window.innerWidth;
let h = window.innerHeight;
let ft;
let txtSize = 30;
let fonts = ["Dawning of a New Day", "Sacramento", "Waiting for Sunrise"];
let numLines;
let colors = [];
let alpha = 100;

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
      colors.push(c);
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
    }
  }
  noFill();
  makeLines();
  noStroke();
  rectMode(CORNER);
  for (let hub of hubs) {
    fill(255, 50);
    rect(width / 2, hub.y, width / 2, h / 2)
    fill(0, 200);
    textFont(random(fonts))
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

function makeLines() {
  let ind = 0;
  for (let hI = 0; hI < hubs.length; hI++) {
    for (let nI = 0; nI < hubs[hI].nodes.length; nI++) {
      strokeWeight(3, 2);
      stroke(colors[ind]);
      beginShape();
      curveVertex(hubs[hI].nodes[nI].pos.x, hubs[hI].nodes[nI].pos.y)
      for (let h = hI; h < hubs.length; h++) {
        for (let n = nI; n < hubs[h].nodes.length; n++) {
          let no = noise(ind * 0.1, nI * 0.1, hI * 0.1);
          no = map(no, 0, 1, -200, 200);
          curveVertex(hubs[h].nodes[n].pos.x + no, hubs[h].nodes[n].pos.y + no);
        }
      }
      curveVertex(hubs[hubs.length - 1].x, hubs[hubs.length - 1].y)
      endShape();
      ind++;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, keys.length * h / 2)
}