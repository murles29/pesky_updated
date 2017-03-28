//Load the music and sounds
sounds.load([
  "../sound/music/GameMusic.wav",
  "../sound/music/MenuMusic.wav",
  "../sound/music/Jump.wav"
]);

sounds.whenLoaded = loadSounds;

function loadSounds() {

//Create the sounds
var gameMusic = sounds["../sound/music/GameMusic.wav"],
    menuMusic = sounds["../sound/music/MenuMusic.wav"],
    jumpSound = sounds["../sound/music/Jump.wav"];

    menuMusic.volume = 0.7; // menu music volume
    menuMusic.loop = true;  // menu music loops

    gameMusic.volume = 0.7; // game music volume
    gameMusic.loop = true; // game music loops

  // menu music plays automatically when menu is active
  // needs more work
  if (g.state = optionsState){
    menuMusic.play();
  }

  // game music plays automatically when game is active
  // needs more work
/*
  if (g.state = play && !menuMusic.playing){
      menuMusic.pause();
      gameMusic.play();
  }
  */




  //Capture the keyboard events
  var b = keyboard(66),
      c = keyboard(67),
      d = keyboard(68),
      space = keyboard(32);

  //Control the sounds based on which keys are pressed

  //Play the menu music
  b.press = function() {
    if (!menuMusic.playing) {
      menuMusic.play();
      gameMusic.pause();
    }
    console.log('menu music playing');
  };

  //Play the game music
  d.press = function() {
    if (!gameMusic.playing) {
      gameMusic.play();
      menuMusic.pause();
    }
    console.log('game music playing');
  };

  //Pause the music
  c.press = function() {
    menuMusic.pause();
    gameMusic.pause();
    console.log('music paused');
  };

  // Jump sound
  space.press = function() {
    if (!player.jumping) {
        jumpSound.play();
      }
    };
}

var optionsGroup;
function initOptions() {
  optionsGroup = new PIXI.Container();
  let buttonBack = createButton(WIDTH * 0.15, HEIGHT * .85, mainMenu, optionsGroup, 'back');
  var buttonMute = createButton(WIDTH / 2, HEIGHT * 0.5 - 90, muteAudio, optionsGroup, 'mute');
  tutorial = new PIXI.Text('just press c to pause music, ignore the button', {font: '50px Arial', fill: 'red'});

  optionsGroup.addChild(buttonBack); // this button is reused for credits and tutorial
  optionsGroup.addChild(tutorial);
  optionsGroup.addChild(buttonMute);
  g.stage.addChild(optionsGroup);
}

function mainMenu() {
  g.state = menuState;
}

function muteAudio() {
// add later
}
