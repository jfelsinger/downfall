'use strict';
/* jslint browser: true */

require('./main');

var pixi = require('pixi.js');

var stage = window.stage = new pixi.Stage(0x66FF99);
var renderer = window.renderer = pixi.autoDetectRenderer(400,300);

document.body.appendChild(renderer.view);

renderer.render(stage);
