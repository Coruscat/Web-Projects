// Setting up the window
"use strict";
const app = new PIXI.Application({
    width: 600,
    height: 800,
});

//move into div
window.onload =
document.querySelector("#pixi").appendChild(app.view);

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

// pre-load the images
app.loader.
    add([
        "imgs/duck.png",
        "imgs/bread.png",
        "imgs/cloudsSheet.png",
        "imgs/StartScreen.png",
        "imgs/bg.png",
        "imgs/ui.png",
        "imgs/duck-sheet.png",
        "imgs/gameover.png"
    ]);
app.loader.onProgress.add(e => { console.log(`progress=${e.progress}`) });
app.loader.onComplete.add(setup);
app.loader.load();

// game variables
let state;
let bg;
let ui;
let mainMenu;
let gameplay;
let gameOver;
let score;
let scoreLabel;
let gameOverScore;
let buttonStyle;
let startGame;
let textStyle;
let hunger;
let eating = false;
let life;
let player;
let breadTime;
let hungerTime;
let paused = true;
let counter;
let breadSpawnRate;
let breadbox = [];
let deathSound; 
let cloudTextures;
let menuTextures;
let duckTextures;
let hungerPips = [];

//controls
document.addEventListener('keydown', onKeyDown);

//setup
function setup()
{
    
    // setup states
    state = app.stage;
    bg = new PIXI.Sprite.from('imgs/bg.png');
    ui = new PIXI.Sprite.from('imgs/ui.png');
    state.addChild(bg);

    mainMenu = new PIXI.Container();
    state.addChild(mainMenu);

    gameplay = new PIXI.Container();
    gameplay.visible = false;
    state.addChild(gameplay);

    gameOver = new PIXI.Container();
    gameOver.visible = false;
    state.addChild(gameOver);

    duckTextures = loadSpriteSheet('imgs/duck-sheet.png',173,92,25,25,1);
    player = new Duck(0,0,duckTextures);
    gameplay.addChild(player);

   
    // create menus and UI for each scene (replace with imgs later)
    let buttonStyle = new PIXI.TextStyle(
        {
            fill: 0xd95763,
            fontSize: 48,
            fontFamily: "georgia" 
        });
    
    // #region mainMenu
    menuTextures = loadSpriteSheet('imgs/StartScreen.png', 600, 800,15,15,1);
    animate(0, 0, 0, 0, menuTextures, true, mainMenu, 1/5);

    let startButton = new PIXI.Text("Dash!");
    startButton.style = new PIXI.TextStyle({
        fill: 0xd95763,
        fontSize: 48,
        fontWeight: 900,
        fontFamily: "Courier New"
    });
    startButton.x = 220;
    startButton.y = sceneHeight - 100;
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on("pointerup", start); // 
    startButton.on('pointerover', e => e.target.alpha = 0.7);
    startButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    mainMenu.addChild(startButton);
    // #endregion
    // #region gameplay
    gameplay.addChild(ui);
    counter = 1;
    scoreLabel = new PIXI.Text();
    scoreLabel.style = new PIXI.TextStyle({
        fill: 0xd95763,
        fontSize: 35,
        fontFamily: "Futura",
    });
    scoreLabel.x = 165;
    scoreLabel.y = 0;   
    gameplay.addChild(scoreLabel);

    for (let i = 0; i < 5; i++)
    {
        let hungerPip = new PIXI.Graphics();
        hungerPip.beginFill(0xd95763);
        hungerPip.drawRect(465 + (i * 25), 11, 25, 20);
        hungerPip.endFill();
        hungerPips.push(hungerPip);
        gameplay.addChild(hungerPip);
        hungerPip.visible = false;
    }

    // #endregion 
    // #region gameOver
    let gameOverScreen = new PIXI.Sprite.from('imgs/gameover.png');
    gameOver.addChild(gameOverScreen);

    gameOverScore = new PIXI.Text("Final Score: ");
    gameOverScore.style = new PIXI.TextStyle({
	    fill: 0xd95763,
	    fontSize: 50,
        fontFamily: "Futura",
        stroke: 0xFFFFFF,
        strokeThickness: 1
    });
    gameOverScore.x = 165;
    gameOverScore.y = 350;
    gameOver.addChild(gameOverScore);

    

    // 3B - make "play again?" button   
    let playAgainButton = new PIXI.Text("Play Again?");
    playAgainButton.style = buttonStyle;
    playAgainButton.x = 160;
    playAgainButton.y = 600;
    playAgainButton.interactive = true;
    playAgainButton.buttonMode = true;
    playAgainButton.on("pointerup",start); // startGame is a function reference
    playAgainButton.on('pointerover',e=>e.target.alpha = 0.7); // concise arrow function with no brackets
    playAgainButton.on('pointerout',e=>e.currentTarget.alpha = 1.0); // ditto
    gameOver.addChild(playAgainButton);
    // #endregion
    
    
    // load sound
    deathSound = new Howl({
        src: ['sound/quack.mp3']
    });
    // load sprite sheets
    cloudTextures = loadSpriteSheet('imgs/cloudsSheet.png', 600, 800, 94,10,9);

    //Setup animation and bg
    animate(0, 0, 0, 0, cloudTextures, true, state, 1);

    // start gameloop 
    app.ticker.add(gameLoop);
}

function start() 
{
    //set scenes
    mainMenu.visible = false;
    gameOver.visible = false;
    gameplay.visible = true;

    // reset variables
    life = 1;
    player.x = 300;
    player.y = 700;
    score = 0;
    breadTime = 0;
    breadbox = [];
    breadSpawnRate = 2;
    counter = 5;
    paused = false;
    eating = false;
    hunger = 0;
    hungerTime = 0;
}

function bakeBread(speed)
{
    //randomly choose an int 1-3
    let waveType = Math.floor(Math.random() * 3) + 1;;

    //converting the speed given to pixels
    speed *= 100;

    //Different waves of bread
    if (waveType == 1)
    {
        let bread2 = new Bread(200, -100,speed);
        breadbox.push(bread2);
        gameplay.addChild(bread2);
        let bread3 = new Bread(400, -100,speed);
        breadbox.push(bread3);
        gameplay.addChild(bread3);
    }

    if (waveType == 2)
    {
        let bread1 = new Bread(0, -100,speed);
        breadbox.push(bread1);
        gameplay.addChild(bread1);
        let bread3 = new Bread(400, -100,speed);
        breadbox.push(bread3);
        gameplay.addChild(bread3);
    }

    if (waveType == 3)
    {
        let bread1 = new Bread(0, -100,speed);
        breadbox.push(bread1);
        gameplay.addChild(bread1);
        let bread2 = new Bread(200, -100,speed);
        breadbox.push(bread2);
        gameplay.addChild(bread2);
    }
    paused = false;
}

function gameLoop() {
    //delta time and making sure the game doesn't run unncessarily
    if (paused) return;
    let dt = 1 / app.ticker.FPS;
    if (dt > 1 / 12) dt = 1 / 12;
    
    //Timer
    breadTime += dt;

    //If the timer ends
    if (breadTime >= breadSpawnRate) {
        //lower the spawn rate of bread/timer length
        if (breadSpawnRate > .5) {
            breadSpawnRate -= .1;
        }
        //speed up bread
        counter += .4;
        //make another wave of bread
        bakeBread(counter);
        //Increment hunger
        if (hunger < 5) {
            hunger++;
        }
        //Increase the player's score for seeing another wave
        score++;
        //reset timer
        breadTime = 0;
    }

    //reset the player's state before changing it below
    player.color(0xFFFFFF);
    player.invul = false;

    // eating
    if (eating)
    {
        //Start a timer
        hungerTime += dt;

        //The conditions for invul(let the player know by turning yellow)
        if (hungerTime <= 3 && hunger == 5)
        {
            player.invul = true;
            player.color(0xFFFF00);
        }
        //reset hunger after using invul
        if (hungerTime >= 3 && hunger == 5)
        {
            hunger = 0;
        }
        //Don't allow player to eat if conditions aren't met
        if (hungerTime >= 3)
        {
            hungerTime = 0;
            eating = false;
        }
    }


    //move bread
    for (let b of breadbox)
    {
        b.move(dt);

        //if bread is offscreen delete it
        if (b.y >= 820)
        {
            b.isAlive = false;
            gameplay.removeChild(b);
        }    

        // check collisions
        if (b.isAlive && rectsIntersect(b, player))
        {
            gameplay.removeChild(b);
            
            //kill player if hit
            if (player.invul == false)
            {
                deathSound.play();
                life--; 
            }
        }
    }
    // filter out bread of the array
    breadbox = breadbox.filter(b => b.isAlive);


    // update UI
    scoreLabel.text = `${score}`;

    //There are rect PIXI graphics for each unity of hunger
    hungerPips.forEach(p => p.visible = true);//reset visibility
    for (let i = 0; i < hunger; i++)
    {
        hungerPips[i].visible = false;//tick down hunger UI
    }

    // check for player death
    if (life <= 0)
    {
        paused = true;
        gameEnd();
    }
}

//display the end game stats and lets the player restart
function gameEnd()
{
    breadbox.forEach(b => gameplay.removeChild(b));
    
    mainMenu.visible = false;
    gameplay.visible = false;
    gameOver.visible = true;

    gameOverScore.text = `Final Score:\n          ${score}`;
    breadbox = [];
}

//will filter a sprite sheet into textures
function loadSpriteSheet(src, width, height, frames, rows, columns)
{
    let spriteSheet = PIXI.BaseTexture.from(src);
    let textures = [];
    for (let i = 0; i < frames; i++)
    {
        for (let k = 0; k < rows; k++)
        {
            for (let j = 0; j < columns; j++)
            {
                let frame = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(k * width, j * height, width, height));
                textures.push(frame);
            }
        }
        
        
    }
    return textures;
}

//animates any sprite sheets
function animate(x,y,frameWidth,frameHeight,src,loop,scene,speed)
{
    let w2 = frameWidth / 2;
    let h2 = frameHeight / 2;
    let anim = new PIXI.AnimatedSprite(src);
    anim.x = x - w2;
    anim.y = y - h2;
    anim.loop = loop;
    anim.animationSpeed = speed;
    scene.addChild(anim);
    anim.play();
}

// controls
function onKeyDown(key)
{
    //A key (left)
    if (key.keyCode == 65)
    {
        if ((player.x - 200) > 0)
        {
            player.x -= 200;
        }
    }

    //D key (right)
    if (key.keyCode == 68)
    {
        if ((player.x + 200) < 600)
        {
            player.x += 200;
        }
    }

    //Space key 
    if (key.keyCode == 32)
    {
        eating = true; // see gameplay loop
    }
}

// collision
function rectsIntersect(a,b){
    var ab = a.getBounds();
    var bb = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}