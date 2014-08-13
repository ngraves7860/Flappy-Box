//Initialize Phaser Engine. Create a 400x490px game.

var game= new Phaser.Game(400,490, Phaser.AUTO, "gameDiv");

//Create our main state that will contain the game
//This is the body of the game itself. It contains all relevant code

var mainState = {

  preload: function () {
    //This function will execute at the beginning of the game
    //Here we'll load all of our assets (art, music, etc)
    
},

  create: function () {
  //The create function is calle right after the preload function
  //This is where we'll set up the game assets from scratch
  
},

  update: function () {
  //This function is called 60 times a second
  //it contains the games logic and all tie related actions
  
  
},





}


//Add and start the gameState
game.state.add('main', mainState)
game.state.start('main');