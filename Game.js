class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('GameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      GameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('PlayerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

     car = createSprite(400,displayHeight/2,20,20);
     car2 = createSprite(300,displayHeight/2,20,20);
     car3 = createSprite(200,displayHeight/2,20,20);
     car4 = createSprite(100,displayHeight/2,20,20);
     cars = [car,car2,car3,car4]
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var display_position = displayHeight/2;
      var index1 = 0;
      for(var plr in allPlayers){
          index1++
        //  console.log("car"+index+" "+cars[index-1].x)
        console.log(index1+" , "+player.index);
          cars[index1-1].y=displayHeight/2-allPlayers[plr].distance

        if (index1 == player.index)
        {
          cars[index1-1].shapeColor="red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index1-1].y;
          console.log("hello");
        }
        else{
        cars[index1-1].shapeColor="black";
        camera.position.x = displayWidth/2;
        camera.position.y = cars[index1-1].y;
        console.log("hell");
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
  }
}
