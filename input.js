/** @author Bill Marcy */
/**
 * an incrementing counter
 */
var counter = function () {
	var index = 0
	return {
		/** 
		 * Increments the counter,
		 * and gives current index
		 * @return {number} current index (first time = 0)
		 */
		next: function () {
			return index++
		},
		/**
		 * resets counter index to 0
		 * @return {number} 0
		 */
		reset: function () {
			return index = 0
		}
	}
}();

/**
 * @type {number}
 * @constant p the ID of the current interval
 */
var intervalID;
/**
 * begins a new interval for the frame
 */
function play() {
	pause()
	intervalID = setInterval(function () {
		var current = counter.next();
		if (current >= 65536) {
			counter.reset();
		}
		paintSquares(current);
	}, 50);
}
/**
 * pauses the current interval
 */
function pause() {
	clearInterval(intervalID);
}
/**
 * stops and resets the current interval
 */
function stop() {
	pause();
	counter.reset();
	paintSquaresAtZero();
}
/**
 * validates and applies the input RGB functions
 */
function apply() {
	var rgb = document.forms["rgb"]
	/**
	 * the red component function
	 * @type {string|MathExpr}
	 */
	var red = rgb["red"].value;
	/**
	 * the green component function
	 * @type {string|MathExpr}
	 */
	var green = rgb["green"].value;
	/**
	 * the blue component function
	 * @type {string|MathExpr}
	 */
	var blue = rgb["blue"].value;

	red = eval(SExp.parse(red));
	green = eval(SExp.parse(green));
	blue = eval(SExp.parse(blue));

	fillFrame(red, green, blue);
}
