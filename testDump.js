var symbols = [];
var i;
for(i = 0; i < 1000; i++) {
	symbols[i] = String.fromCharCode(56 + (i % 15));
}

function ex() {
	document.getElementById("test").innerHTML += "!";
}
function qu() {
	document.getElementById("test").innerHTML += "?";
}
function hash() {
	document.getElementById("test").innerHTML += "#";
}
function ast() {
	document.getElementById("test").innerHTML += "*";
}
function red() {
	document.getElementById("test").style.color = "red";
}
function green() {
	document.getElementById("test").style.color = "green";
}
function blue() {
	document.getElementById("test").style.color = "blue";
}
function dollar() {
	var i;
	for(i = 0; i < symbols.length; i++) {
		document.getElementById("test").innerHTML += symbols[i];
	}
}