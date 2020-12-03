'use strict';


let state = 'title';
let cnv;
let health = 100;
let w = 800;
let h = 400;
let player;
let coins = [];
let playerImg;
let coinImg;
var darkness = false;
let timer = 6;


function preload(){
  playerImg = loadImage('assets/player.png');
  coinImg = loadImage('assets/lightorb.png');
}



function setup() {
  cnv = createCanvas(w, h);
  textFont('monospace');
  player = new Player();
  // coins[0] = new Coin();
  coins.push(new Coin);

}

function draw() {


  switch (state) {
    case 'title':
      title();
      cnv.mouseClicked(titleMouseClicked);
      break;
    case 'level 1':
      level1();
      cnv.mouseClicked(level1MouseClicked);
      break;
    case 'YOU WIN':
      youWin();
      cnv.mouseClicked(youWinMouseClicked);
      break;
    default:
      break;
  }

  text(timer, width/2, height/2);
  fill(75,90,90);

}


function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    player.direction = 'left';
  } else if (keyCode == RIGHT_ARROW) {
    player.direction = 'right';
  } else if (keyCode == UP_ARROW) {
    player.direction = 'up';
  } else if (keyCode == DOWN_ARROW) {
    player.direction = 'down';
  } else if (key = ' ') {
    player.direction = 'still';
  }
}

function title() {
  background(0);
  textSize(15);
  fill(255);
  textAlign(CENTER);
  text('ENDLESS', w / 2, h / 5);
  text('click anywhere to start', width / 2, h / 2);
  text('collect light orbs to keep health from decreasing', width / 2, h / 3);
  textSize(10);

}

function titleMouseClicked() {

  console.log('canvas is clicked on title page');
  state = 'level 1';


}

function level1() {
  background(0);

  textSize(30);
  text('HEALTH:' + health, 0, height - 100,width/2);
  textSize(30);


  //decreases health as loong as darkness is true
  if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
  health --;
}else {
  health = health; // how to keep healh value to tsay the same after collecting lightorb??
}

  if (random(1) <= 0.01) {
    coins.push(new Coin());
  }




//iterating through coins array to display and move them
// using for loop
// for (let i = 0; i < coins.length; i++) {
//   coins[i].display();
//   coins[i].move();
// }

// using for each method

coins.forEach(function(coin) {

  coin.display();
  coin.move();


})





  for (let i = coins.length -1; i >= 0; i--) {

    //check for collision, if there is collision then increase point by 1
    if (dist(player.x, player.y, coins[i].x, coins[i].y) <= (player.r + coins[i].r) / 2) {

      console.log(health);
      coins.splice(i,1);

        darkness =!darkness;
        timer = 6;
    }else if (coins[i].y > h) {
      coins.splice(i,1);
    }

  }
  if (darkness === true) {

    background(255);
    time(); //counts down when dark
    // if player collects light orb make lightorbs stop spawning


  }
  text(`Health: ${health} `);
  //need to move player health and timer

      player.display();
      player.move();
}

function level1MouseClicked() {



}

function time(){

  if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
  timer --;
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
// https://www.w3schools.com/jsref/jsref_now.asp -- for timer

if (timer <= 0) {
    level1();
}



function youWin() {
  background(255, 50, 80);
  textSize(80);
  stroke(255);
  text('ROADA ROLLA DA', 100, 100);
  text('click anywhere to re-start', 70, 300);
  textSize(10);
}

function youWinMouseClicked() {
  state = 'level 1';
  health = 100;
}
}
