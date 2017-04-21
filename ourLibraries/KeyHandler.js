//----------------------------------------------------------Thomas Rosik-------------------------------------------------------------------
//variable to control if movement stops when landing during a jump
var moveMent = false,
  left, up, right, down, space, shiftKey, switchE, f1, esc, nVal, f,
  fpsEnabled = false,
  isAttacking = false,
  disableAttacking = false,
  keyCodes = [],
  attackInterval;

function Keys() {
  //Left arrow key `press` method
  left.press = function() {
    if (!player.jumping && !disableMovement && !f.isDown) {
      player.sprite.scale.x = player.animal == 'goose' ? 0.8 : 1;
      player.sprite.vx = -5 * 60 / fps;
      player.setTextures(5);
      this.doingIdle = false;
      player.sprite.play();
    }
  };

  //Left arrow key `release` method
  left.release = function() {
    if (!right.isDown && !player.jumping) {
      if (!disableMovement) player.sprite.gotoAndStop(0);
        player.sprite.vx = 0;
    }
  };

  //Right
  right.press = function() {
    if (!player.jumping && !disableMovement && !f.isDown) {
      player.sprite.scale.x = player.animal == 'goose' ? -0.8 : -1;
      player.setTextures(5);
      this.doingIdle = false;
      player.sprite.play();
      player.sprite.vx = 5 * 60 / fps;
    }
  };

  right.release = function() {
    if (!left.isDown && !player.jumping) {
      if (!disableMovement) player.sprite.gotoAndStop(0);
      player.sprite.vx = 0;
    }
  };

  space.press = function() {
    player.spacePush = true;
  };

  space.release = function() {
    player.spacePush = false;
  };

  f.press = function() {
    if (!player.jumping && !disableMovement && !disableAttacking && !ePressed) {
      disableMovement = isAttacking = true;
      if (player.animal == 'raccoon') {
        setTimeout(function() {
          player.sprite.vxa = player.sprite.scale.x * -1;
        }, 250);
      }
      let delay = 650;
      if (player.animal == 'skunk') {
        delay = 750;
      }
      setTimeout(function() {
        if (disableMovement && isAttacking && !ePressed) {
          player.sprite.vxa = 0;
          player.doIdle();
          disableMovement = isAttacking = false;
        }
      }, delay);
      if (!player.testTextures(0)) {
          player.setTextures(0);
      }
      player.sprite.gotoAndStop(0);
      player.sprite.play();
      player.sprite.animationSpeed = 0.2;
      player.doingIdle = false;
    }
  };

  switchE.press = function() {
    if (!ePressed) {
      ePressed = true;
      if (!player.inHouse && b.hit(player.sprite, houseDoors, false, false, false,
        function(collision, doorHit) {
          if (!player.jumping && g.state != caughtState && g.state != gameOverState) {
            let index = houseDoors.indexOf(doorHit);
            enterHouse(index % interiors.length, index);
          }
        })) {
      }

      if (b.hit(player.sprite, door, false, false, false) && !player.jumping) {
        buildOutside();
      }
      for (let i = 1; i <= 3; i++) {
        if (!player.jumping && !player.inHouse) {
          if (b.hitTestRectangle(player.sprite,
            new PIXI.Rectangle(eval('hedgeLocX'+i)+157, hedgeLocY, 1, 300),
            false, false, false)) {
            player.setTextures(11);
            player.sprite.play();
            player.sprite.x = eval('hedgeLocX'+i) + 157;
            player.holdX = eval('hedgeLocX'+i) + 157;
            disableAttacking = true;
            g.state = moveIntoHedgeState;
          }
        }
      }
    }
  };

  f1.press = function() {
    fpsEnabled = !fpsEnabled;
  };

  nVal.press = function() {
    if (player.sprite.position.x >= 12340 || player.sprite.position.x <= -11940) {
      newLevelVal = true;
      gameObjects.removeChild(chaosBar);
      chaos = 0;
      pointsToAdd += 10;
      updatePoints();
      people1 = [];
      people2 = [];
      people3 = [];
      garbages = [];
      // People sprites
      numPeople = 8; // Total number of people PER SPRITE TYPE
      peopleTypes = 3; // Number of sprite types for people
      // eval() takes a string and turns it into code which makes it
      // much easier to generate and assign repetitive variables
      for (let i = 1; i <= peopleTypes; i++) {
        for (let j = 1; j <= numPeople; j++) { // it is assumed all 3 people arrays have equal length
          eval('person'+i+'_'+j+' = new spriteCreator('+'\'../images/AiSprites/person_'+i+'.png\', 50, 75);');
          eval('people'+i).push(eval('person'+i+'_'+j));
        }
        eval('person'+i+'_sick = new spriteCreator(\'../images/AiSprites/person_'+i+'_sick.png\', 50, 75);');
      }

      // Objects like garbage
      for (let i = 1; i <= 50; i++) { // 50 garbages in the world
        eval('garbage' + i + '= new spriteCreator(\'../images/WorldObjects/garbage.png\', 80, 42);');
        eval('garbages.push(garbage' + i + ');');
      }
      initGame(player.animal);
      newLevelVal = false;
    }
  };
}
