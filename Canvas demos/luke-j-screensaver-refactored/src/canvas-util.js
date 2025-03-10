export const drawRectangle = (ctx, x, y, width, height, fillStyle = "black", lineWidth = 0, strokeStyle = "black") => {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.rect(x,y,width,height);
    ctx.stroke();
};

export const drawArc = (ctx,x,y,radius,fillStyle="black",lineWidth=0,strokeStyle="black",startAngle=0,endAngle=Math.PI*2) => {
    ctx.fillStyle = fillStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.arc(x,y,radius,startAngle,endAngle,false);
    ctx.stroke();
};

export const drawLine = (ctx,x1,y1,x2,y2,lineWidth=1,strokeStyle="black") => {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
};
