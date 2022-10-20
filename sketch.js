let info = {
  alys: 10,
  // brandon: 5,
  // fidelia: 8,
  // marcel: 10,
  // megan: 5,
  // sejo: 5,
  // shalaka: 10,
  // teoma: 4,
  // thembi: 4,
  // ximena: 6
}
let txt = {
  alys: ["Across latitudes and how to build a new, with a new collaborative work Across latitudes and languages", "beginning With care and obsessions", "and letting go of vocabulary constantly", "possibility", "The unforeseen", "Okay blurry", "How to place", "Now relations", "And our differences", "As the as the guiding resource", "So the work", "is more documentation", "Of process", "Then the", "Then the outcome", "The outcome", "would be", "Like", "respectful relationships across", "by artists from different", "geopolitical situations", "and And language that hadn't been seen in advance", "Let the restrictions that house", "house abandon our", "The conventions of outcome focused research proposal to instead focus on"],
  brandon: ["lorem"],
  fidelia: ["lorem"],
  marcel: ["lorem"],
  megan: ["lorem"],
  sejo: ["Another project to do as I was saying", "like connecting different like these beautiful rooms and different possible paths between them", "some of them like maybe you could go from one to another direct directly on my way to in order to get to another", "you have to take a longer path"],
  shalaka: ["lorem"],
  teoma: ["lorem"],
  thembi: ["lorem"],
  ximena: ["lorem"]
}
let hubs = [];
let keys;
let w = window.innerWidth;
let h = window.innerHeight;
let ft;
let txtSize = 30;

function preload() {
  ft = loadFont("VT323-Regular.ttf")
  // num of get keys;
  keys = Object.keys(info);
  for (k = 0; k < keys.length; k++) {
    let name = keys[k];
    let o = new Hub(k, name);
    let numImg = info[name];
    for (p = 0; p < numImg; p++) {
      let img = loadImage(`${name}/${name}${p+1}.jpg`);
      let i = new Node(img, o.x, o.y);
      o.nodes.push(i);
    }
    hubs.push(o);
  }
}

function setup() {
  createCanvas(w, keys.length * h);
  textFont(ft);
  textSize(txtSize);
  textWrap(WORD);
  noFill();
  strokeWeight(8);
  rectMode(CENTER);
  imageMode(CENTER);
  //  translate(-width / 2, -height / 2, 0); //moves our drawing origin to the top left corner
}

function draw() {
  background(255);
  // draw squiggle
  beginShape();
  curveVertex(hubs[0].x, hubs[0].y)
  for (let hub of hubs) {
    for (let node of hub.nodes) {
      curveVertex(node.pos.x, node.pos.y);
    }
  }
  curveVertex(hubs[hubs.length - 1].x, hubs[hubs.length - 1].y)
  endShape();
  //show images + text
  for (let hub of hubs) {
    for (let node of hub.nodes) {
      node.show();
    }
    noStroke();
    let r = random(1);
    if (r < 1) {
      fill(255, 100);
      rect(width / 2, hub.y, width / 2, h / 2)
      fill("black");
      for (t = 0; t < txt[hub.name].length; t++) {
        text(txt[hub.name][t], width / 2, hub.y + (t * txtSize))
      }
    }
    //else if (r < 2) {
    //   fill(255, 100);
    //   rect(width / 4, hub.y, width / 2, h / 2)
    //   fill("black");
    //   text(txt[hub.name], width / 4, hub.y, width / 2, h / 2)
    // } else if (r < 3) {
    //   fill(255, 100);
    //   rect(width, hub.y, width / 2, hub.y + h)
    //   fill("black");
    //   text(txt[hub.name], width, hub.y, width / 2, hub.y + h)
    // }
    noLoop();
  }
}
class Hub {
  constructor(index, name) {
    this.name = name,
      this.index = index,
      this.nodes = [],
      this.x = random(125, w - 125);
    this.y = (h * this.index) + h / 3;
    this.mass = 1;
  }
}
class Node {
  constructor(img, x, y) {
    // this.des = createVector(random(x + 300, x + 300), random(y - 300, y + 300));
    this.pos = createVector(random(x, x + 300), random(y - 300, y + 300));
    // this.vel = p5.Vector.random2D();
    // this.vel.mult(random(10));
    this.img = img;
    this.r = 250;
  }
  show() {
    this.edges();
    image(this.img, this.pos.x, this.pos.y, this.r, this.r)
  }
  // update(x, y, mag, lim) {
  //   let hub = createVector(x, y);
  //   //let ran = p5.Vector.random2D();
  //   this.acc = p5.Vector.sub(hub, this.pos);
  //   this.acc.setMag(mag);
  //   this.vel.add(this.acc);
  //   this.vel.limit(lim);
  //   this.pos.add(this.vel);
  // }
  edges() {
    if (this.pos.x <= 0) {
      this.pos.x = 0;
    }
    if (this.pos.x >= width) {
      this.pos.x = width - 250;
    }
  }
}