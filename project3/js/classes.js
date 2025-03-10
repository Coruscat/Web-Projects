class Duck extends PIXI.AnimatedSprite // main player class
{
    constructor(x = 0, y = 0,textures)
    {
        super(textures,true);
        this.invul = false;
        this.anchor.set(.5, .5);
        this.x = x;
        this.y = y;
        this.play();
        this.animationSpeed = 1 / 4;
    }

    color(newColor) //color has to be set in here
    {
        this.tint = newColor;
    }
}

class Bread extends PIXI.Sprite //bread objects 
{
    constructor(x = 0, y = 0,speed = 100)
    {
        super(app.loader.resources["imgs/bread.png"].texture);
        this.x = x;
        this.y = y;
        this.fwd = { x: 0, y: 1 };
        this.speed = speed;
        this.isAlive = true;
    }

    move(dt = 1 / 60) //move the bread down
    {
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }
}