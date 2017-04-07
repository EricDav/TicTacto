Array.prototype.isEqual = function(arr){
  if(this.length !== arr.length){
    return false;
  }
  for(var i = 0; i < arr.length; i++){
    if(this[i] !== arr[i]){
      return false;
    }
  }
  return true;
};

class Game{
  
	constructor (){
		this.board = [0,0,0,0,0,0,0,0,0];
		this.over = false;
		this.flag = true
	}
	setBoard(board){
		this.board = board;
	}

	playerPlay(pos) {
	  
		if( this.board[pos] === 0 && this.over === false) {
			this.board.splice(pos, 1, 1);
			return true;
		}
		
		else{
	  	return false;
		}
		
	}
	
	computerPlay() {
		var dir;
		if(this.over === true){
			return null;
		}
		dir = Decision(this.board)
		this.board.splice(dir, 1, 2);
		//console.log(dir);
		
		return dir;
	}
		
	isOver(){
		var x = [1,1,1];
  		var o = [2,2,2];
  		var check = 1
  		var f = [[this.board[0], this.board[1], this.board[2]],[this.board[3], this.board[4], this.board[5]], [this.board[6], this.board[7], this.board[8]],[this.board[0], this.board[3], this.board[6]], [this.board[1], this.board[4], this.board[7]],[this.board[2], this.board[5], this.board[8]],[this.board[0], this.board[4], this.board[8]],[this.board[2], this.board[4], this.board[6]]];
    	for(var i = 0; i < f.length; i++){
      		if(f[i].isEqual(x)){
      			this.over = true;
        		return [true, "You won!", -1];
      		}
      		else if (f[i].isEqual(o)){
      			this.over = true;
        		return [true, "Computer won!", 1];
      		}
    	}

		for(i = 0; i < this.board.length; i++){
				if(this.board[i] === 0){
					check = 0;
					break;
				}
			}

			if(check === 1){
				this.over = true;
				return [true, "It was a tie", 0];
			} 
			this.over = false;
			return [false];
		}
  }


var game = new Game();
var Board = new Game();


function Insert(index, number, arr){
  narr = [];
  for(var i =0; i < arr.length; i++){
    if(i === index){
      	narr.push(number);
    } 
    else{
    	narr.push(arr[i]);
    }
  }
  return narr;
}

function genChildren(board, num){
	var children = [];
	for (var i = 0; i < board.length; i++){
		if(board[i] === 0){
			children.push(Insert(i, num, board));
		}
	}
	return children;
}
function Utility(board){
	Board.setBoard(board);
	Board.over = true;
	return Board.isOver()[2];
}

function isTerminal(board){
	Board.setBoard(board);
	Board.over = true;
	return Board.isOver()[0];
}

function Minimize(board){
	if(isTerminal(board)){
		return [null, Utility(board)];
	}
	var minChild = null;
	var minUtility = 1000;
	var children = genChildren(board, 1);
	for(var i = 0; i < children.length; i++){
		var utility = Maximise(children[i])[1];
		if(utility < minUtility){
			minUtility = utility;
			minChild = children[i];
		}

	}
	return [minChild, minUtility];
}

function Maximise(board){
	if(isTerminal(board)){
		return [null, Utility(board)];
	}
	var maxChild = null;
	var maxUtility = -1000;
	var children = genChildren(board, 2);
	for(var i = 0; i < children.length; i++){
		var utility = Minimize(children[i])[1];
		if(utility > maxUtility){
			maxUtility = utility;
			maxChild = children[i];
		}

	}
	return [maxChild, maxUtility];
}

function Decision(board){
	var gam = Maximise(board);
	var child = gam[0];
	for(var i = 0; i < board.length; i++){
		if(board[i] !== child[i]){
			return i;
		}
	}
}

function name(a, n){
		if(game.isOver()[0]){
			document.getElementById("result").textContent = "Game Over! \n" + game.isOver()[1];
			score();
		}
		if(n === 1){
			document.getElementById("man").textContent = a;
		}
		else if(game.playerPlay(0)){
			document.getElementById("man").textContent = a;
			game.isOver();
			var x = game.computerPlay();
			if(x === null){
				if(game.isOver()[0]){
					document.getElementById("result").textContent = "Game Over! \n" + game.isOver()[1];
					score();
				}
			}
			else if(x === 1){
				name1("O", 1);
			}
			else if(x === 2){
				name2("O",1)
			}
			else if(x === 3){
				name3("O",1)
			}
			else if(x === 4){
				name4("O",1)
			}
			else if(x === 5){
				name5("O",1)
			}
			else if(x === 6){
				name6("O",1)
			}
			else if(x === 7){
				name7("O",1)
			}
			else if(x === 8){
				name8("O",1)
			}
		}

}
function name1(a, n){
	if(game.isOver()[0]){
		document.getElementById("result").textContent = "Game Over! \n" + game.isOver()[1];
		score();
	}
	if(n === 1){
		document.getElementById("man1").textContent = a;
	}

	else if(game.playerPlay(1)){
		document.getElementById("man1").textContent = a;
		game.isOver();
		var x = game.computerPlay();
		if(x === null){
			if(game.isOver()[0]){
				document.getElementById("result").textContent = "Game Over! \n" + game.isOver()[1];
				score();
			}
		}
		else if(x === 0){
			name("O", 1);
		}
		else if(x === 2){
			name2("O", 1);
		}
		else if(x === 3){
			name3("O", 1)
		}
		else if(x === 4){
			name4("O",1)
		}
		else if(x === 5){
			name5("O",1)
		}
		else if(x === 6){
			name6("O",1)
		}
		else if(x === 7){
			name7("O",1)
		}
		else if(x === 8){
			name8("O",1)
		}
	}
}

function name2(a, n){
	if(game.isOver()[0]){
		document.getElementById("result").textContent = "Game Over! \n" + game.isOver()[1];
		score();
	}
	if(n === 1){
		document.getElementById("man2").textContent = a;
	}
	else if(game.playerPlay(2)) {
		document.getElementById("man2").textContent = a;
		game.isOver();
		var x = game.computerPlay();
		if(x === null){
			if(game.isOver()[0]){
				document.getElementById("result").textContent = "Game Over! \n" + game.isOver()[1];
				score();
			}
		}
	    else if(x === 0){
			name("O", 1);
		}
		else if(x === 1){
			name1("O", 1)
		}
		else if(x === 3){
			name3("O", 1)
		}
		else if(x === 4){
			name4("O",1)
		}
		else if(x === 5){
			name5("O",1)
		}
		else if(x === 6){
			name6("O",1)
		}
		else if(x === 7){
			name7("O", 1)
		}
		else if(x === 8){
			name8("O", 1)
		}
	}
}

function name3(a, n){
	if(game.isOver()[0]){
		document.getElementById("result").textContent = "Game Over! \n" + game.isOver()[1];
		score();
	}
	if(n === 1){
		document.getElementById("man3").textContent = a;
	}

	else if(game.playerPlay(3)){
		document.getElementById("man3").textContent = a;
		game.isOver();
		var x = game.computerPlay();
		if(x === null){
			if(game.isOver()[0]){
				document.getElementById("result").textContent = "Game Over! \n" + game.isOver()[1];
				score();
			}
		}
		else if(x === 1){
			name1("O",1);
		}
		else if(x === 2){
			name2("O",1)
		}
		else if(x === 0){
			name("O",1)
		}
		else if(x === 4){
			name4("O",1)
		}
		else if(x === 5){
			name5("O",1)
		}
		else if(x === 6){
			name6("O",1)
		}
		else if(x === 7){
			name7("O",1)
		}
		else if(x === 8){
			name8("O",1)
		}
	}
}

function name4(a, n){
	if(game.isOver()[0]){
		document.getElementById("result").textContent = "Game Over! \n" + game.isOver()[1]
		score();
	}
	if(n === 1){
		document.getElementById("man4").textContent = a;
	}

	else if(game.playerPlay(4)){
		document.getElementById("man4").textContent = a;
		game.isOver();
		var x = game.computerPlay();
		if(x === null){
			if(game.isOver()[0]){
				document.getElementById("result").textContent = "Game Over! \n" + game.isOver()[1];
				score();
			}
		}
		else if(x === 1){
			name1("O",1);
		}
		else if(x === 2){
			name2("O",1)
		}
		else if(x === 3){
			name3("O",1)
		}
		else if(x === 0){
			name("O",1)
		}
		else if(x === 5){
			name5("O",1)
		}
		else if(x === 6){
			name6("O",1)
		}
		else if(x === 7){
			name7("O",1)
		}
		else if(x === 8){
			name8("O",1)
		}
	}
}

function name5(a, n){
	if(game.isOver()[0]){
		document.getElementById("result").textContent = "Game Over! \n" + game.isOver()[1];
		score();
	}
	if(n === 1){
		document.getElementById("man5").textContent = a;
	}

	else if(game.playerPlay(5)){
		document.getElementById("man5").textContent = a;
		game.isOver();
		var x = game.computerPlay();
		if(x === null){
			if(game.isOver()[0]){

				document.getElementById("result").textContent = "Game Over! \n" + game.isOver()[1];
				score();
			}
		}
		else if(x === 1){
			name1("O",1);
		}
		else if(x === 2){
			name2("O",1)
		}
		else if(x === 3){
			name3("O",1)
		}
		else if(x === 4){
			name4("O",1)
		}
		else if(x === 0){
			name("O",1)
		}
		else if(x === 6){
			name6("O",1)
		}
		else if(x === 7){
			name7("O",1)
		}
		else if(x === 8){
			name8("O",1)
		}
	}
}

function name6(a, n){
	if(game.isOver()[0]){
		document.getElementById("result").textContent = "Game Over! \n" + game.isOver()[1];
		score();
	}
	if(n === 1){
		document.getElementById("man6").textContent = a;
	}

	else if(game.playerPlay(6)){
		document.getElementById("man6").textContent = a;
		game.isOver();
		var x = game.computerPlay();
		if(x === null){
			if(game.isOver()[0]){
				document.getElementById("result").textContent = "Game Over! \n" + game.isOver()[1];
				score();
			}
		}
		else if(x === 1){
			name1("O",1);
		}
		else if(x === 2){
			name2("O",1)
		}
		else if(x === 3){
			name3("O",1)
		}
		else if(x === 4){
			name4("O",1)
		}
		else if(x === 5){
			name5("O",1)
		}
		else if(x === 0){
			name("O",1)
		}
		else if(x === 7){
			name7("O",1)
		}
		else if(x === 8){
			name8("O",1)
		}
	}
}

function name7(a, n){
	if(game.isOver()[0]){
		document.getElementById("result").textContent = "Game Over! \n" + game.isOver()[1];
		score();
	}
	if(n === 1){
		document.getElementById("man7").textContent = a;
	}

	else if(game.playerPlay(7)){
		document.getElementById("man7").textContent = a;
		game.isOver()
		var x = game.computerPlay();
		if(x === null){
			if(game.isOver()[0]){
				document.getElementById("result").textContent = "Game Over! \n" + game.isOver()[1];
				score();
			}
		}
		else if(x === 1){
			name1("O",1);
		}
		else if(x === 2){
			name2("O",1)
		}
		else if(x === 3){
			name3("O",1)
		}
		else if(x === 4){
			name4("O",1)
		}
		else if(x === 5){
			name5("O",1)
		}
		else if(x === 6){
			name6("O",1)
		}
		else if(x === 0){
			name("O",1)
		}
		else if(x === 8){
			name8("O",1)
		}
	}
}

function name8(a, n){
	if(game.isOver()[0]){
		document.getElementById("result").textContent = "Game Over! \n" + game.isOver()[1];
		score();
	}
	if(n === 1){
		document.getElementById("man8").textContent = a;
	}

	else if(game.playerPlay(8)){
		document.getElementById("man8").textContent = a;
		game.isOver();
		var x = game.computerPlay();
		if(x === null){
			if(game.isOver()[0]){
				document.getElementById("result").textContent = "Game Over! \n" + game.isOver()[1];
				score();
			}
		}
		else if(x === 1){
			name1("O",1);
		}
		else if(x === 2){
			name2("O",1)
		}
		else if(x === 3){
			name3("O",1)
		}
		else if(x === 4){
			name4("O",1)
		}
		else if(x === 5){
			name5("O",1)
		}
		else if(x === 6){
			name6("O",1)
		}
		else if(x === 7){
			name7("O",1)
		}
		else if(x === 0){
			name("O",1)
		}
	}
}

function score(){
	if(game.isOver()[2] === 0 && game.flag){
		var a = Number(document.getElementById("second").textContent) + 1;
		var b = Number(document.getElementById("fifth").textContent) + 1;
		document.getElementById("second").textContent = a.toString();
		document.getElementById("fifth").textContent = b.toString();
	}
	else if(game.isOver()[2] === 1 && game.flag){
		var a = Number(document.getElementById("sixth").textContent) + 1;
		var b = Number(document.getElementById("first").textContent) + 1;
		document.getElementById("sixth").textContent = a.toString();
		document.getElementById("first").textContent = b.toString();
	}
	game.flag = false;
}

function buton(){
	if(game.isOver()[0]){
		document.getElementById("man").textContent  = "";
		document.getElementById("man1").textContent = "";
		document.getElementById("man2").textContent = "";
		document.getElementById("man3").textContent = "";
		document.getElementById("man4").textContent = "";
		document.getElementById("man5").textContent = "";
		document.getElementById("man6").textContent = "";
		document.getElementById("man7").textContent = "";
		document.getElementById("man8").textContent = "";
		document.getElementById("result").textContent = "";
		game.setBoard([0,0,0,0,0,0,0,0,0]);
		game.over = false;
		game.flag = true;
	}
}


// if(game.isOver()[0]){
// 		console.log(game.isOver()[1])
// }
