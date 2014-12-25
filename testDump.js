function getRandom(range) {
	return Math.floor(Math.random() * range);
}

function getSignedRandom(range) {
	return Math.floor((Math.random() - 0.5) * range);
}

function hexToChar(hex) {
	if(hex < 10)
		return String.fromCharCode(48 + hex);
	else return String.fromCharCode(55 + hex);
}

function hexToColor(r, g, b) {
	var color = "#";
	color += hexToChar(r / 16);
	color += hexToChar(r % 16);
	color += hexToChar(g / 16);
	color += hexToChar(g % 16);
	color += hexToChar(b / 16);
	color += hexToChar(b % 16);
	return color;
}

function randomColor() {
	var color = "#";
	color += hexToChar(getRandom(16));
	color += hexToChar(getRandom(16));
	color += hexToChar(getRandom(16));
	color += hexToChar(getRandom(16));
	color += hexToChar(getRandom(16));
	color += hexToChar(getRandom(16));
	return color;
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.strokeStyle = "#FF0000";
var width = 1000;
var height = 500;
var step = 50;
var nc = width / step;
var nr = height / step;
var size = 50;
// ctx.lineWidth = 5;
ctx.strokeRect(0, 0, width, height);
// ctx.translate(5, 5);

var squares = new Array(nr);
for(var i = 0; i < nr; i++) {
	squares[i] = new Array(nc);
	for(var j = 0; j < nc; j++) {
		var norm = (i * i) + (j * j);
		norm = Math.sqrt(norm);
		var r = 255 * getRandom(2); // * getRandom(2);
		var g = 255 * getRandom(2);
		var b = 255 * getRandom(2);
		r %= 256;
		g %= 256;
		b %= 256;
		//var bw = norm; //getRandom(256);
		//bw %= 256;
		squares[i][j] = hexToColor(r, g, b);
		//squares[i][j] = hexToColor(bw, bw, bw);
	}
}
function paintSquare(pos) {
	var x = Math.floor(pos.x);
	var y = Math.floor(pos.y);

	x /= step;
	y /= step;
	x = Math.floor(x);
	y = Math.floor(y);
	ctx.fillStyle = squares[y][x];
	ctx.fillRect(x * step, y * step, size, size);
}

function clearSquare(pos) {
	var x = Math.floor(pos.x);
	var y = Math.floor(pos.y);
	x /= step;
	y /= step;
	x = Math.floor(x);
	y = Math.floor(y);
	ctx.fillStyle = "black";
	ctx.fillRect(x * step, y * step, size, size);
}

function paintCross(pos, num) {
	var x = Math.floor(pos.x);
	var y = Math.floor(pos.y);

	x /= step;
	y /= step;
	x = Math.floor(x);
	y = Math.floor(y);
	console.log(x);
	console.log(y);
	for(var j = x - num; j <= x + num; j++) {
		ctx.fillStyle = squares[y][j];
		ctx.fillRect(j * step, y * step, size, size);
	}
	for(var i = y - num; i <= y + num; i++) {
		ctx.fillStyle = squares[i][x];
		ctx.fillRect(x * step, i * step, size, size);
	}
}

var painted = false;
function paintSquares() {
	var x;
	var y;
	for(var i = 0; i < nr; i++) {
		for(var j = 0; j < nc; j++) {
			x = j * step;
			y = i * step;
			paintSquare({x: x, y :y});
		}
	}
	painted = true;
}

function clearSquares() {
	var x;
	var y;
	for(var i = 0; i < nr; i++) {
		for(var j = 0; j < nc; j++) {
			x = j * step;
			y = i * step;
			clearSquare({x: x, y :y});
		}
	}
	painted = false;
}

function getMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

var mousePos = {x : -step, y : -step};
canvas.addEventListener('mousemove', function(evt) {
	if(!painted) {
		clearSquare(mousePos);
		mousePos = getMousePos(evt);
		paintSquare(mousePos);
	}
}, false);