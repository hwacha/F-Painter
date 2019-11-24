/** @author Bill Marcy */
/**
 * immutable rgb color value
 * @constructor
 * @param {number} r red component value
 * @param {number} g green component value
 * @param {number} b blue component value
 * @typedef {Object} Color
 */
function Color(r, g, b) {
	/**
	 * @param {number} n
	 * @return {number} n % 256 s.t. 0 <= n < 256
	 */
	function setRange(n) {
		var m = n % 256
		return m < 0 ? m + 256 : m
	}
	var red = setRange(r)
	var green = setRange(g)
	var blue = setRange(b)
	this.toString = function () {
		/**
		 * converts a digit to a
		 * two-digit hexidecimal string
		 * @param  {number} hex a digit
		 * @return {string} the hex-string representation
		 */
		function hexToChar(hex) {
			if(hex < 10)
				return String.fromCharCode(48 + hex);
			else if(hex < 16)
				return String.fromCharCode(55 + hex);
			else
				return undefined;
		}
		/**
		 * converts a component to hex-string form
		 * @return {string} the modified string base
		 */
		var writeColor = function () {
			var base = "#";
			return function (comp) {
				base += hexToChar(comp / 16);
				return base += hexToChar(comp % 16);
			}
		}()
		writeColor(red)
		writeColor(green)
		return writeColor(blue)
	}
}
/**
 * @namespace
 * common colors and their color values
 */
var color = {
	black: new Color(0, 0, 0),
	white: new Color(255, 255, 255),
	grey: new Color(128, 128, 128),
	red: new Color(255, 0, 0),
	green: new Color(0, 255, 0),
	blue: new Color(0, 0, 255),
	yellow: new Color(255, 255, 0),
	cyan: new Color(0, 255, 255),
	magenta: new Color(255, 0, 255),
	orange: new Color(255, 128, 0),
	brown: new Color(128, 64, 0)
}
