class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    background("yellow");
    textSize(35);
    Contestant.getPlayerInfo();
    if(allContestants !== undefined){
      textSize(20);
      fill("blue");
      text("NOTE : Contestant who answered correct are highlighted in green color!",230,430);
    for(var plr in allContestants){
      var correctAns = 2;
      if ( correctAns === allContestants[plr].answer){
        fill("Green");
        text(allContestants[plr].name.toString(),230,500);
      }
      else{
        fill("red");
        text(allContestants[plr].name.toString(),230,500);
      }
    }
    
    }
    
  }

}
