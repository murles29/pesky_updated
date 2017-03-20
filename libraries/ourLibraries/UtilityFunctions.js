//---------------------------------------------------------Thomas Rosik------------------------------------------------------------------------
function jump() {
  //start the player jump
  if (player.spacePush && player.sprite.vy == 0) {
    player.sprite.vy = -7;
  }
  if (player.sprite.y < player.lowestHeight) {
    player.sprite.vy += 0.3;
  }
  if (player.sprite.y > player.lowestHeight) {
    player.sprite.vy = 0;
    player.sprite.y = player.lowestHeight;
  }
}

//build the inside of a house
function enterHouse() {
  door.x = 800;
  door.y = 700;

  house.addChild(houseBackground1);
  house.addChild(door);
  house.addChild(player.sprite);
  stage = house;
}

function attack()
{
  if(Raccoon.active)
  {
    //TODO: do raccoon attack, shoot rabies
  }
  if(Skunk.active)
  {
      //TODO: do skunk attack, spray smells
  }
  if(Goose.active)
  {
    //TODO: do goose attack, fly, poop
  }

//TODO:
// create new instance of projectile for animal
// add to an array of projectiles, limit the size so they can only do it so many times
// once attack is done, remove projectile from screen and array
// create an object for each type of projectile, poop, rabies, spray


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
  g.stage.position.y = renderer.height / 2;
    //scale it
  g.stage.scale.x = 1.5;
  g.stage.scale.y = 1.5;

  this.updateCamera = function() {
    //now specify which point INSIDE stage must be (0,0)
    g.stage.pivot.x = player.sprite.position.x;
    g.stage.pivot.y = player.sprite.position.y;
  };
}

function createGameWorld() {
  var gameWorld =
    {
      x : 0,
      y : 0,
      width : 1000, //x size of background
      height : 1000 // y size of background
    };

  camera.x = (gameWorld.x / 2) - camera.width / 2;
  camera.y = (gameWorld.y / 2) - camera.height / 2;
}
