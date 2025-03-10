/*
	The purpose of this file is to take in the analyser node and a <canvas> element: 
	  - the module will create a drawing context that points at the <canvas> 
	  - it will store the reference to the analyser node
	  - in draw(), it will loop through the data in the analyser node
	  - and then draw something representative on the canvas
	  - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils.js';
let ctx,canvasWidth,canvasHeight,gradient,analyserNode,audioData;
let setupCanvas = (canvasElement,analyserNodeRef) => {
	// create drawing context
	ctx = canvasElement.getContext("2d");
	canvasWidth = canvasElement.width;
	canvasHeight = canvasElement.height;
	// create a gradient that runs top to bottom
	gradient = utils.getLinearGradient(ctx,0,0,0,canvasHeight,[{percent:.60,color:"orange"},{percent:.45,color:"yellow"},{percent:.1,color:"magenta"}]);
	// keep a reference to the analyser node
    analyserNode = analyserNodeRef;
	// this is the array where the analyser data will be stored
    audioData = new Uint8Array(analyserNode.fftSize / 2);
}



let draw = (params={})=>{
  // 1 - populate the audioData array with the frequency data from the analyserNode
    // notice these arrays are passed "by reference" 
    if (params.frequency)
    {
        analyserNode.getByteFrequencyData(audioData);
    }
    else
    {
        analyserNode.getByteTimeDomainData(audioData);
    }

	// OR
	//analyserNode.getByteTimeDomainData(audioData); // waveform data
	
	// 2 - draw background
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = .1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();
		
    
    ctx.save();
    ctx.fillStyle = gradient;
    ctx.globalAlpha = .3;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();
	
    

	// 4 - draw bars
    if (params.showBars)
    {
        let barSpacing = 4;
        let margin = 5;
        let screenWidthForBars = canvasWidth - (audioData.length * barSpacing) - margin * 2;
        let barWidth = screenWidthForBars / audioData.length;
        let barHeight = 200;
        let topSpacing = 100;

        ctx.save();
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'white';
        ctx.translate(canvasHeight / 2 + 215, canvasWidth / 4);
        for (let i = 0; i < audioData.length; i++)
        {
            let percent = i / 255;
            if (percent < .02) percent = .02;
            ctx.translate(barWidth, 0);
            ctx.rotate(Math.PI * 2/32);
            ctx.fillRect(0, 0, barWidth, 1 + audioData[i]);
        }
        ctx.restore();
    }
	// 5 - draw circles
    let maxRadius = canvasHeight / 6;
    ctx.save();
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < audioData.length; i++)
    {
        let percent = audioData[i] / 255;
        let circleRadius = percent * maxRadius;
        ctx.beginPath();
        ctx.fillStyle = utils.makeColor(200 + 20 * percent, 200 + 20 * percent, 200 + 20 * percent, .34 - percent / 3.0);
        ctx.arc(100 * percent,300 * percent,circleRadius, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = utils.makeColor(200, 200, 200, .34 - percent / 3.0);
        ctx.arc(750 - 50 * percent, 300 * percent, circleRadius, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    ctx.restore();
    

    // 6 - bitmap manipulation
	// TODO: right now. we are looping though every pixel of the canvas (320,000 of them!), 
	// regardless of whether or not we are applying a pixel effect
	// At some point, refactor this code so that we are looping though the image data only if
	// it is necessary
    

	// A) grab all of the pixels on the canvas and put them in the `data` array
	// `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!
	// the variable `data` below is a reference to that array 
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width;
    
	// B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
    for (let i = 0; i < length; i += 4){
        if (params.showNoise && Math.random() < .05)
        {
            if (params.showInvert)
            {
                let red = data[i], green = data[i + 1], blue = data[i + 2];
                data[i] = 255 - red;
                data[i + 1] = 255 - green;
                data[i + 2] = 255 - blue;    
            }
            else {
                data[i] = data[i + 1] = data[i + 2] = 0;
                data[i] = 255;
            }
            
        }
    }

    for (let i = 0; i < length; i++)
    {
        if (params.showEmboss)
        {
            if (i % 4 == 3) continue;
            data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];
        }
        
    }
		// C) randomly change every 20th pixel to red
	
			// data[i] is the red channel
			// data[i+1] is the green channel
			// data[i+2] is the blue channel
			// data[i+3] is the alpha channel
			// zero out the red and green and blue channels
			// make the red channel 100% red
	//	} // end if
	// } // end for
	
	// D) copy image data back to canvas
    ctx.putImageData(imageData, 0, 0);
}

export {setupCanvas,draw};