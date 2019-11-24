/** @author Bill Marcy */
/**
 * the HTML canvas for painting
 * @type {Object}
 */
var canvas = document.getElementById("canvas")
/**
 * 2D context for canvas
 * @type {Object}
 */
var ctx = canvas.getContext("2d");

ctx.transform(1, 0, 0, -1, 0, canvas.height);
/**
 * the distance between squares
 * @type {number}
 */
var step = 10
/**
 * number of columns in frame
 * @type {number}
 */
var nc = canvas.width / this.step
/**
 * number of rows in frame
 * @type {number}
 */
var nr = canvas.height / this.step
/**
 * size of the square
 * @type {number}
 */
var size = 8
/**
 * array containing
 * first color functions
 * and then color values
 * @type {MathExpr[]|Color[]}
 */
var squares = new Array(nr);
/**
 * reduces color function to only require t value
 * @param  {MathExpr} rFunc red function dependent on x, y, t
 * @param  {MathExpr} gFunc green function dependent on x, y, t
 * @param  {MathExpr} bFunc blue function depednent on x, y, t
 * @return {MathExpr} functions dependent only on t
 */
function reduceXY(rFunc, gFunc, bFunc) {
	return function (x, y) {
		return {
			red: bind(bind(rFunc, "x", x), "y", y),
			green: bind(bind(gFunc, "x", x), "y", y),
			blue: bind(bind(bFunc, "x", x), "y", y)
		};
	}
}
/**
 * initializes window frame with color functions dependent on t
 * @param  {MathExpr} rFunc red function dependent on x, y, t
 * @param  {MathExpr} gFunc green function dependent on x, y, t
 * @param  {MathExpr} bFunc blue function depednent on x, y, t
 */
function fillFrame(rFunc, gFunc, bFunc) {
	var f = reduceXY(rFunc, gFunc, bFunc);
	for(var i = 0; i < nr; i++) {
		squares[i] = new Array(nc);
		for(var j = 0; j < nc; j++) {
			squares[i][j] = f(j, i);
		}
	}

}
/**
 * [doSquare description]
 * @param  {Function} fun
 * @return {Function} a function from position to canvas fill
 */
function doSquare(fun) {
	return function (pos) {
		var x = Math.floor(pos.x);
		var y = Math.floor(pos.y);
		x /= step;
		y /= step;
		x = Math.floor(x);
		y = Math.floor(y);
		fun(x, y);
		ctx.fillRect(x * step, y * step, size, size);
	}
}
/**
 * paints a square at a given time and position
 * @param  {Number} t time index
 * @return {Function} position => paint on canvas
 */
function paintSquare(t) {
	return function (pos) {
		doSquare(function (x, y) {
			var current = squares[y][x];
			ctx.fillStyle =
			new Color(bind(current.red, "t", t),
				bind(current.green, "t", t),
				bind(current.blue, "t", t));
		})(pos);
	}
}
/**
 * applys a function to all squares in frame
 * @param  {Function} fun
 */
function doSquares(fun) {
	var x;
	var y;
	for(var i = 0; i < nr; i++) {
		for(var j = 0; j < nc; j++) {
			x = j * step;
			y = i * step;
			fun({x: x, y: y});
		}
	}
}
/**
 * paints all squares in frame at a given time
 * @param  {number} t time index
 */
function paintSquares(t) {
	doSquares(paintSquare(t));
}
/**
 * paints all squares in frame at the 0 time index
 */
function paintSquaresAtZero() {
	paintSquares(0);
}
