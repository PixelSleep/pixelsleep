/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	// Clock
	function getClock() {
	    //Get Current Time
	    var d = new Date();
	    var str = prefixZero(d.getHours(), d.getMinutes(), d.getSeconds());

	    //Get the Context 2D or 3D
	    var clock = document.getElementById('clock');
	    var context = clock.getContext("2d");
	    context.clearRect(0, 0, 500, 200);
	    context.font = "80px Arial";
	    context.fillStyle = "#717070";
	    context.fillText(str, 42, 125);
	}

	function prefixZero(hour, min, sec) {
	    var curTime = void 0;
	    if (hour < 10) curTime = "0" + hour.toString();else curTime = hour.toString();

	    if (min < 10) curTime += ":0" + min.toString();else curTime += ":" + min.toString();

	    if (sec < 10) curTime += ":0" + sec.toString();else curTime += ":" + sec.toString();
	    return curTime;
	}

	setInterval(getClock, 1000);

/***/ }
/******/ ]);