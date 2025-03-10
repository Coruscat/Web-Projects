/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';

const drawParams = {
  showGradient: false,
  showBars: false,
  showCircles: false,
  showNoise: false,
  showInvert: false,
  showEmboss: false,
  frequency: true,
};

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
	sound1  :  "./New Adventure Theme.mp3"
});

let loadJSON = () => {
  const url = "data/av-data.json";
  const xhr = new XMLHttpRequest();
  xhr.onload = (e) => {
      console.log(`In onload - HTTP Status Code = ${e.target.status}`);
      const string = e.target.responseText;
      const json = JSON.parse(string);

    document.title = json.title;
    document.querySelector("#instructions").innerHTML = json.instructions;
  }

  xhr.open("GET", url);
  xhr.send();
}

document.onload = loadJSON();

function init() {
  audio.setupWebAudio(DEFAULTS.sound1);
	console.log("init called");
	console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
	let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
  setupUI(canvasElement);
  canvas.setupCanvas(canvasElement,audio.analyserNode);
  loop();
}

let setupUI = (canvasElement) => {
  const playButton = document.querySelector("#btn-play");
  playButton.onclick = e => {
    console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

    if (audio.audioCtx.state == "suspended") {
      audio.audioCtx.resume();
    }

    console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
    if (e.target.dataset.playing == "no") {
      audio.playCurrentSound();
      e.target.dataset.playing = "yes";
    }
    else {
      audio.pauseCurrentSound();
      e.target.dataset.playing = "no";
    }
  };

  // A - hookup fullscreen button
  const fsButton = document.querySelector("#btn-fs");
  

  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("goFullscreen() called");
    utils.goFullscreen(canvasElement);
  };

  let volumeSlider = document.querySelector("#slider-volume");
  let volumeLable = document.querySelector("#slider-volume");

  volumeSlider.oninput = e => {
    audio.setVolume(e.target.value);
    volumeLable.innerHTML = Math.round((e.target.value / 2 * 100));
  };

	
  volumeSlider.dispatchEvent(new Event("input"));

  let trackSelect = document.querySelector("#select-track");

  trackSelect.onchange = e => {
    audio.loadSoundFile(e.target.value);
    if (playButton.dataset.playing == "yes") {
      playButton.dispatchEvent(new MouseEvent("click"));
    }
  };

  
} // end setupUI



function loop(){
    setTimeout(loop,1000/60);
    canvas.draw(drawParams);
    drawParams.showBars = document.querySelector("#cb-bars").checked;
    if (document.querySelector("#select-vis").value == "freq") drawParams.frequency = true;
    audio.filter(document.querySelector("#select-filter").value);
  }

export {init};