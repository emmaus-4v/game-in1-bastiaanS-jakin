/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */


const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;
var vijandGeraakt = false
var spelerGeraakt = false;

var spelerX = 200; // x-positie van speler
var spelerY = 100; // y-positie van speler



var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var randomVijandPlaats = 0;
var vijandX = 300;   // x-positie van vijand
var vijandY = 20 + randomVijandPlaats;  // y-positie van vijand

var lives = 3;
var score = 0; // aantal behaalde punten
var speed = 20;

var W_KEY = 87;
var S_KEY = 83;
var A_KEY = 65;
var D_KEY = 68;
var tijdVijandGeraakt = 0;
var vijandSpawned = false;

var kogelAan = false;
var vorigeMuisPressed = false;
var vijandBreedte = 50;
var vijandLengte = 50;

var raak = false;

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
   
  fill("blue");
  rect(20, 20, width - 2 * 20, height - 2 * 20);
  fill ("white");
  textSize (30);
  // @ts-ignore
  text("score = " + score , 30, 50,);
  
  // @ts-ignore
  text ("time = " + round(millis()/600) , 30, 80)
 // @ts-ignore
  text ("tijdVijandGeraakt = " +tijdVijandGeraakt , 30, 140)
  // @ts-ignore
  text ("lives = " +lives , 30, 110)
};
/**
 timer
 */



/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
    if(vijandGeraakt == false && round(millis()/600) - tijdVijandGeraakt > 5 ){
  fill("black");
  rect(x, y, vijandBreedte, vijandLengte);
  vijandSpawned = true;
  randomVijandPlaats = Math.floor(Math.random() * 600);
    }else{
        vijandSpawned = false;
    }
};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {
if (kogelAan && vorigeMuisPressed == false){
   stroke("red");
   strokeWeight(7);
    line (x, y, spelerX + 25, spelerY + 25);
    stroke ("black");
    strokeWeight(2);
   vorigeMuisPressed = true;
}
};

 

/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
  fill("white");
  rect(x, y, 50, 50);

  
};


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {
    
};
 

/*
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {
  if(mouseIsPressed ){
kogelAan = true;
}else {
    kogelAan = false;
    vorigeMuisPressed = false;
}
};
/**
 mouseX > vijandX && mouseX < vijandX+50
 */
var kogelTotVijand = function (){
if(mouseX > vijandX && mouseX < vijandX+50 ) {
raak = true;
}
else{
    raak = false;
    
}
};

/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {
 
    /* beweeg bij toetsindruk */
    if(keyIsDown(W_KEY)){
    spelerY = spelerY - speed
    }
    if (keyIsDown(S_KEY)){
    spelerY = spelerY + speed
    }
    if (keyIsDown(A_KEY)){
    spelerX = spelerX - speed
    }
    if (keyIsDown(D_KEY)){
    spelerX = spelerX + speed
    }

    /* zorg dat speler op scherm blijft */
    if (spelerX > 1207) {
        spelerX = 1207;
    }
    if(spelerX < 23 ){
        spelerX = 23;
    }

    if(spelerY < 23 ){
        spelerY = 23;
    }
    if (spelerY > 647){
        spelerY = 647;
    }
    
};



    



/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {
if(mouseX >vijandX && mouseX < vijandX + vijandBreedte && mouseY > vijandY && mouseY < vijandY + vijandLengte && kogelAan && vorigeMuisPressed == false && vijandSpawned || spelerGeraakt){
    vijandGeraakt = true;
    tijdVijandGeraakt = round(millis()/600);
}else{
    vijandGeraakt = false;
}
  return vijandGeraakt ;
};
 


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    if(spelerX + 25 > vijandX && spelerX + 25 < vijandX + vijandBreedte && spelerY + 25 > vijandY && spelerY + 25 < vijandY + vijandLengte && vijandSpawned){
        spelerGeraakt = true;

    }else{
        spelerGeraakt = false;
}

    
  return spelerGeraakt;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {

  return false;
};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('purple');
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case SPELEN:
      beweegVijand();
      beweegKogel();
      beweegSpeler();
      
      
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
        score = score + 1;
        score = score + 0;
        vijandY = Math.floor(Math.random() * 600);
       
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
        lives = lives - 1;
        
      }

      tekenVeld();
      tekenVijand(vijandX, vijandY);
      tekenKogel(mouseX, mouseY);
      tekenSpeler(spelerX, spelerY);

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }

}