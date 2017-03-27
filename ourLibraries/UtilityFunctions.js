//---------------------------------------------------------Thomas Rosik------------------------------------------------------------------------
function jump() {
  //start the player jump
  if (player.spacePush && player.sprite.vy == 0) {
    player.jumping = true;
    if (fps >= 30) {
      player.sprite.vy = -5 * 60 / fps;
    } else {
      player.sprite.vy = -5;
    }
  }
  // if (player.sprite.vy == 0 && player.lastVy >= 0) {
  //   player.jumping = false;
  // }
  if (player.jumping) {
    player.sprite.gotoAndStop(0);
  } else {
    if (left.isDown) {
      if (fps >= 30) {
        player.sprite.vx = -5 * 60 / fps;
      } else {
        player.sprite.vx = -5;
      }
      player.sprite.play();
      player.sprite.animationSpeed = .1;
    } else if (right.isDown) {
      if (fps >= 30) {
        player.sprite.vx = 5 * 60 / fps;
      } else {
        player.sprite.vx = 5;
      }
      player.sprite.play();
      player.sprite.animationSpeed = .1;
    } else {
      player.sprite.vx = 0;
    }
  }
  // stop the player if they're not actually pressing anything
  player.lastVy = player.sprite.vy;
}

function spriteCreator(stringTexture, width, height) {
  //checks to see if the input is a string
  // if it is not a string it converts it to a string
  if (typeof stringTexture != 'string') {
    this.stringTexture = String(stringTexture);
  }
  else {
    //sets stringTexture to as the varible passed in
    this.stringTexture = stringTexture;
  }
  //creates a filmstrip of the new texture
  this.texture = animalAnimated.filmstrip(stringTexture, width, height);

  //makes the animated sprite object and returns it
  this.sprite = new MovieClip(this.texture);
  return this.sprite;
}

//build the inside of a house
function enterHouse() {
  map.visible = false;
  door.x = player.sprite.x;
  door.y = player.sprite.y;

  house.addChild(houseBackground1);
  house.addChild(door);
  house.addChild(player.sprite);
  house.visible = true;

}

/*function attack()
{
  var rabies = new spriteCreator('../images/PlayerAnimals/Carlos_attack.png', 55, 45);
  var stink = '../images/PlayerAnimals/Stanky_attack.png';


  //var poop

  if(Raccoon.active)
  {
    player.sprite = rabies;
    player.sprite.play();
  }
  if(Skunk.active)
  {
    player.sprite = stink;
    player.sprite.play();
  }
  /*if(Goose.active)
  {

  }
}*/

//builds the outside game map
function buildOutside() {
  map.addChild(player.sprite);
  map.addChild(animalCont1.aCObject);

  g.stage.gameObjects = map;
}

//function to pick the correct animal object for player
// TODO add functionality to this function. Different character sprites
function pickAnimal(animal) {

}

//generates a random integer between the min and max values
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function camera() {
  g.stage.position.x = renderer.width / 2;
  g.stage.position.y = renderer.height;
  //scale it
  g.stage.scale.x = 4;
  g.stage.scale.y = 4;

  this.updateCamera = function() {
    //now specify which point INSIDE stage must be (0,0)
    g.stage.pivot.x = player.sprite.position.x;
    //g.stage.pivot.y = player.sprite.position.y + 7; // view should include a bit of ground under player
    g.stage.pivot.y = 608; //This can change but doesnt allow the player to see outside of map
  };
}
function updateFps() {
  frameTime = (thisLoop = new Date) - lastLoop;
  lastLoop = thisLoop;
  fps = Math.ceil(1000 / frameTime);
  fpsDisplay.x = player.sprite.x - 160;
  fpsDisplay.y = 426;
  //console.log(player.sprite.y);
}
