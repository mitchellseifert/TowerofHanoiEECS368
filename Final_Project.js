document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.querySelector("#myCanvas");

  function printArea(){
    let wall1 = canvas.getContext("2d");
    wall1.fillStyle = "Red";
    wall1.fillRect(390, 0, 20, 600);

    let wall2 = canvas.getContext("2d");
    wall2.fillStyle = "Red";
    wall2.fillRect(790, 0, 20, 600);

    let bottom = canvas.getContext("2d");
    bottom.fillStyle = "Black";
    bottom.fillRect(0, 600, 1200, 1);

    let title = canvas.getContext("2d");
    title.font = "50pt Impact";
    title.fillStyle = "Red";
    title.fillText("Tower of Hanoi", 15, 675);

    let authors = canvas.getContext("2d");
    authors.font = "20pt Impact";
    authors.fillStyle = "Blue";
    authors.fillText("By Andrew Brown and Mitchell Seifert", 15 , 750);

    let holdText = canvas.getContext("2d");
    holdText.font = "20pt Impact";
    holdText.fillText("Held Disc:", 600, 650);

    let countText1 = canvas.getContext("2d");
    countText1.font = "20pt Impact";
    countText1.fillText("Moves : " + count, 600, 750);
  }

  let clear = canvas.getContext("2d");

  let stack1 = [];
  let stack2 = [];
  let stack3 = [];
  let holdArray = [];

  let stack1Midpoint = 195;
  let stack2Midpoint = 600;
  let stack3Midpoint = 1005;
  let holdArrayMidpoint = 900;

  var userInput = window.prompt("Enter amount of discs (1-7): ");
  if(userInput < 1 || userInput > 7)
  {
      alert("Number outside of Parameters!");
      window.location.reload();
  }
  alert("Press the stack buttons at top of screen to move discs")
  let size = userInput;
  let discNum = size;
  let count = 0;


  for(let i = 0; i < size; i++){
    stack1[i] = discNum;
    discNum--;
  }
  console.log(stack1.length);
  console.log(stack2.length);
  console.log(stack3.length);

  function printBlocks(){
    if(stack1.length == 0){

    }else{
      for(let i = 0; i < stack1.length; i++){
        drawBlock(stack1[i], i, stack1Midpoint);
      }
    }
    if(stack2.length == 0){

    }else{
      for(let i = 0; i < stack2.length; i++){
        drawBlock(stack2[i], i, stack2Midpoint);
      }
    }
    if(stack3.length == 0){

    }else{
      for(let i = 0; i < stack3.length; i++){
        drawBlock(stack3[i], i, stack3Midpoint);
      }
    }
    if(holdArray.length == 0){

    }else{
      for(let i = 0; i < holdArray.length; i++){
        drawBlock(holdArray[i], (-3), holdArrayMidpoint);
      }
    }
  }

function drawBlock(blockNum, arrayPosition, midpoint){
  let block = canvas.getContext("2d");
  block.fillStyle = "Blue";
  block.fillRect((midpoint-((50*blockNum)/2)),(550-(50*arrayPosition)),(50*blockNum),50)
}


  function removeTop(stack){
    length = stack.length;
    holdArray[0] = stack[length-1];
    stack.pop();
    console.log(stack.length);
    console.log(holdArray.length);
    clear.clearRect(0, 0, 1200, 800);
    printArea();
    printBlocks();
  }

  function placeBlock(stack){

    stackLength = stack.length;
    if(holdArray[0] > stack[stackLength-1]){
      alert("Attempted to put a disc on a smaller disc. This is illegal.");
      return;
    }else{
      stack[stackLength] = holdArray[0];
      holdArray.pop();
      console.log(holdArray.length);
      console.log(stack.length);
      clear.clearRect(0, 0, 1200, 800);
      count++;
      printArea();
      printBlocks();
      setTimeout(() => {checkWin();}, 100);
    }
  }

  document.getElementById('stackOne').onclick = function checkHeld1() {
    if(holdArray.length == 0 && stack1.length == 0){
      return;
    }else{
      if(holdArray.length == 1){
        placeBlock(stack1);
      }else{
        removeTop(stack1);
      }
    }
  }

  document.getElementById('stackTwo').onclick = function checkHeld2() {
    if(holdArray.length == 0 && stack2.length == 0){
      return;
    }else{
      if(holdArray.length == 1){
        placeBlock(stack2);
      }else{
        removeTop(stack2);
      }
    }
  }

  document.getElementById('stackThree').onclick = function checkHeld3() {
    if(holdArray.length == 0 && stack3.length == 0){
      return;
    }else{
      if(holdArray.length == 1){
        placeBlock(stack3);
      }else{
        removeTop(stack3);
      }
    }
  }

  function checkWin(){
    if(stack2.length == size){
      alert("Congratulations! You have beat the game in " + count + " moves!\nPerfect Score: " + ((2**size)-1));
    }
    if(stack3.length == size){
      alert("Congratulations! You have beat the game in " + count + "moves!\nPerfect Score: " + ((2**size)-1));
    }

  }

  //Test
  printArea();
  printBlocks();
  //setTimeout(() => {removeTop(stack1);}, 2000);
  //setTimeout(() => {placeBlock(stack2);}, 4000);
  //setTimeout(() => {removeTop(stack1);}, 6000);
  //setTimeout(() => {placeBlock(stack2);}, 8000);
  //setTimeout(() => {removeTop(stack2);}, 10000);
  //setTimeout(() => {placeBlock(stack3);}, 12000);

})
