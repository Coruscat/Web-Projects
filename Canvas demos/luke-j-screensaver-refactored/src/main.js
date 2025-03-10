let paused = false;
let rectangles = true;
let lines = true;
let arcs = true;

import { getRandomColor,getRandomInt } from './util.js';
import { drawArc, drawLine, drawRectangle } from "./canvas-util.js";

const init = () => {
    console.log("page loaded!");
    
    
	const canvas = document.querySelector("canvas");
	const can = canvas.getContext("2d");

	const animate = () => {
		requestAnimationFrame(animate);
		if (!paused){
			if (rectangles)
			{
				drawRectangle(can,getRandomInt(1,500),getRandomInt(0,480),getRandomInt(10,200),getRandomInt(10,200),getRandomColor(),getRandomInt(0,10),getRandomColor());
			}
			if (lines)
			{
				drawLine(can,getRandomInt(0,640),getRandomInt(0,480),getRandomInt(0,640),getRandomInt(0,480),getRandomInt(0,10),getRandomColor());
			}
			if (arcs)
			{
				drawArc(can,getRandomInt(1,500),getRandomInt(0,480),getRandomInt(10,200),getRandomColor(),getRandomInt(0,10),getRandomColor());
			}
		}
	};

	const spraypaint = (x,y,orgX,orgY) => {
		can.strokeStyle = getRandomColor();
		can.lineWidth = getRandomInt(10,50);
		can.beginPath();
		can.moveTo(orgX,orgY);
		can.lineTo(x,y);
		can.stroke();
	};

	const canvasClicked = (e) => {
		let rect = e.target.getBoundingClientRect();
		let mouseX = e.clientX - rect.x;
		let mouseY = e.clientY - rect.y;
		spraypaint(mouseX,mouseY,rect.x,rect.y);
	};
    
    const setupUI = () => {
		const pauseBtn = document.querySelector("#btn-Pause");
		const playBtn = document.querySelector("#btn-Play");
		const canvasBtn = document.querySelector("canvas");
		const rect = document.querySelector("#cb-Rectangles");
		const line = document.querySelector("#cb-Lines");
		const arc = document.querySelector("#cb-Arcs");

		pauseBtn.addEventListener("click", () => paused = true);
		playBtn.addEventListener("click", () => paused = false);
		canvasBtn.addEventListener("click", canvasClicked);
		rect.addEventListener("click", () => rectangles = !rectangles);
		line.addEventListener("click", () => lines = !lines);
		arc.addEventListener("click", () => arcs = !arcs);
    };
    
    setupUI();
	animate();
};

init();