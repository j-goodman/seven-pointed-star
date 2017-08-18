var canvas;
var ctx;
var names;
var nodes;
var offsetX;
var offsetY;
var labels;

window.onload = function () {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  labels = document.getElementById('labels');
  names = ['jon', 'tormund', 'jorah', 'gendry', 'beric', 'sandor', 'thoros'];
  nodes = {
    jon: document.getElementById('jon'),
    tormund: document.getElementById('tormund'),
    jorah: document.getElementById('jorah'),
    gendry: document.getElementById('gendry'),
    beric: document.getElementById('beric'),
    sandor: document.getElementById('sandor'),
    thoros: document.getElementById('thoros'),
  };
  window.onresize();
  drawBaseNodes();
};

window.onresize = function () {
  offsetX = canvas.getBoundingClientRect().left;
  offsetY = canvas.getBoundingClientRect().top;
};

var hover = function () {
  var i;
  ctx.clearRect(0,0,500,500);
  for (i=0 ; i<names.length ; i++) {
    if (this.id !== names[i]) {
      if ((rangers[this.id].relationships[names[i]] === "obverse" ? rangers[names[i]].relationships[this.id] : rangers[this.id].relationships[names[i]]) !== "") {
        drawLine(this.id, names[i], 4);
        describeLine(this.id, names[i]);
      }
    }
  }
};

var unHover = function () {
  drawBaseNodes();
  labels.innerHTML = '';
};

var drawBaseNodes = function () {
  var i;
  var j;
  ctx.clearRect(0,0,500,500);
  for (i=0 ; i<names.length ; i++) {
    nodes[names[i]].onmouseenter = hover;
    nodes[names[i]].onmouseleave = unHover;
    for (j=0 ; j<names.length ; j++) {
      drawLine(names[i], names[j]);
    }
  }
};

var describeLine = function (from, to) {
  var label;
  label = document.createElement('div');
  label.className = 'label';
  label.style.top = nodes[to].getBoundingClientRect().top - offsetY - 30 + 'px';
  label.style.left = nodes[to].getBoundingClientRect().left - offsetX - 20 + 'px';
  label.innerText = rangers[from].relationships[to] === "obverse" ? rangers[to].relationships[from] : rangers[from].relationships[to];
  labels.appendChild(label);
  setTimeout(function () {
    this.className = 'label visible';
  }.bind(label), 10);
};

var drawLine = function (from, to, width) {
  ctx.beginPath();
  if (!width) {
    width = 2;
  }
  ctx.lineWidth = width;
  ctx.moveTo(
    nodes[to].getBoundingClientRect().left - offsetX + 50,
    nodes[to].getBoundingClientRect().top - 20
  );
  ctx.lineTo(
    nodes[from].getBoundingClientRect().left - offsetX + 50,
    nodes[from].getBoundingClientRect().top - 20
  );
  ctx.stroke();
};
