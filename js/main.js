//Initialize Phaser Engine. Create a 400x490px game.

var game= new Phaser.Game(400,490, Phaser.AUTO, "gameDiv");

//Create our main state that will contain the game
//This is the body of the game itself. It contains all relevant code

var mainState = {

  preload: function () {
    //This function will execute at the beginning of the game
    //Here we'll load all of our assets (art, music, etc)
    
    //Set the background color of the game
    game.stage.backgroundColor = "#71c5cf";
    
    game.load.image('bird', 'assets/bird.png');
     
    game.load.image('pipe', 'assets/pipe.png');


},


  create: function () {
  //The create function is calle right after the preload function
  //This is where we'll set up the game assets from scratch
   
 
  game.physics.startSystem(Phaser.Physics.ARCADE);
  
  this.bird = this.game.add.sprite(100, 245, 'bird');
  
  game.physics.arcade.enable(this.bird);
  
  this.bird.body.gravity.y= 1000;
  
  var spacekey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  
  spacekey.onDown.add(this.jump, this);
  
  this.pipes = game.add.group();
  
  this.pipes.enableBody = true;
  
  //Create 20 pipes to hold in the group
  this.pipes.createMultiple(20, 'pipes')
  
  //Add in pipes over 1.5 seconds to the screen
  this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
  
  
  
  this.score = 0;
  
  this.labelScore = game.add.text(20,20, "0", {font: "30px Arial", fill: "#ffffff"});
},

  update: function () {
  //This function is called 60 times a second
  
  
  if (this.bird.inWorld == false) {
    this.restartGame();
  }
  
  game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);

   
},

  addOnePipe: function (x,y) {
    //Get the first dead pipe
    var pipe = this.pipes.getFirstDead();
    
    //Set x and y values of the pipe
    pipe.reset(x,y);
    
    //Move the pipes to the left of the screen
    pipe.body.velocity.x = -200;
    
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
},

  addRowOfPipes: function () {
  var hole = Math.floor(Math.random() * 5) + 1;
  
  
  for(var i = 0; i < 8; i++)
  
    if(i !=hole && i !=hole + 1) {

      this.addOnePipe(400, i*60 + 10);  
      
    }
    
    this.score += 1;
    this.labelScore.text = this.score;
},
  
  jump: function () {
    this.bird.body.velocity.y =-350;
},

  restartGame: function () {
  
    game.state.start('main');
  
},

};


//Add and start the gameState
game.state.add('main', mainState);
game.state.start('main');