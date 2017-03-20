//---------------------------------------------------------Thomas Rosik------------------------------------------------------------------------
function jump() {
  //start the player jump
  if (player.spacePush && player.sprite.vy == 0) {
    player.sprite.vy = -10;
    jump.play();
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

//builds the outside game map
function buildOutside() {

  //TODO create function that generates unlimited background
  // with different background objects, or use tiling software
  // whichever is the easier of the two

  //create the object that represents the player
  player = {
    sprite : animalObject,
    jumping : false,
    jumpHeight : 350,
    spacePush : false,
    lowestHeight : 600,
    active : true,
    moveStates : ['Left', 'Right', 'Jump', 'StopL', 'StopR']
  };

  player.sprite.anchor.set(0.5, 1);

  //set the objects starting velocities
  player.sprite.vx = 0;
  player.sprite.vy = 0;

  //set the objects starting point
  player.sprite.x = 300;
  player.sprite.y = 600;

  //position the example house
  houseOutside1.x = 500;
  houseOutside1.y = 400;

  //add both the background and the animal to the stage
  map.addChild(whiteFloor);
  map.addChild(animalCont1.aCObject);
  map.addChild(player.sprite);
  //map.addChild(houseOutside1);

  stage = map;
}

//function to pick the correct animal object for player
// TODO add functionality to this function. Different character sprites
function pickAnimal(animal) {

}

//generates a random integer between the min and max values
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
