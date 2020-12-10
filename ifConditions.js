function allTheIfConditions(){

  if (mousePressedOver(playButton) && gameState === "menu") {
    playButton.destroy();
    play();
  }
  if (mousePressedOver(pauseButton) && gameState === "play") {
    board.visible = false;
    bow.visible = false;
    pause();
  }

  if (mousePressedOver(homeButton) && gameState === "pause") {
    gameState = "menu";
    bow.destroy();
    board.destroy();
    pauseScreen.destroy();
    homeButton.destroy();
    resumeButton.destroy();
    playButton = createSprite(windowWidth / 2, windowHeight / 2 + 200);
    playButton.addImage(playImg);
    score = 0;
    timer = 4;
  }

  if (mousePressedOver(resumeButton) && gameState === "pause") {
    gameState = "play";
    pauseScreen.destroy();
    pauseScreen.destroy();
    homeButton.destroy();
    resumeButton.destroy();
    restartButton.destroy();
    board.visible = true;
    bow.visible = true;
    pauseButton = createSprite(windowWidth / 1.05, windowHeight / 9.5);
    pauseButton.addImage(pauseImg);
    pauseButton.scale = 1;
  }

  if(mousePressedOver(restartButton) && gameState === "pause"){
    score = 0;
    gameState = "play";
    pauseScreen.destroy();
    pauseScreen.destroy();
    homeButton.destroy();
    resumeButton.destroy();
    restartButton.destroy();
    board.x = windowWidth/1.5;
    board.y = windowHeight/2;
    board.visible = true;
    bow.visible = true;
    pauseButton = createSprite(windowWidth / 1.05, windowHeight / 9.5);
    pauseButton.addImage(pauseImg);
    pauseButton.scale = 1;
    timer = 4;
  }

  /*if(arrow.body.position.x >= windowWidth / 7){
    arrow.body.position.x === windowWidth / 7
  }*/

  if(gameState === "play"){
    arrow.display();
    sling.display();
  }
}