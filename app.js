//create solving loading screen when not visualizing

const squares = document.querySelectorAll(".board div")
const sbutton = document.querySelector("#solve-button")
const cbutton = document.querySelector("#create-board")
const vbutton = document.querySelector("#visual")
const board = [[0,0,0,2,6,0,7,0,1],
			   [6,8,0,0,7,0,0,9,0],
			   [1,9,0,0,0,4,5,0,0],
			   [8,2,0,1,0,0,0,4,0],
			   [0,0,4,6,0,2,9,0,0],
			   [0,5,0,0,0,3,0,2,8],
			   [0,0,9,3,0,0,0,7,4],
			   [0,4,0,0,5,0,0,3,6],
			   [7,0,3,0,1,8,0,0,0]]

const board2 = [[0,2,0,0,0,0,0,0,0],
			    [0,0,0,6,0,0,0,0,3],
			    [0,7,4,0,8,0,0,0,0],
			    [0,0,0,0,0,3,0,0,2],
			    [0,8,0,0,4,0,0,1,0],
			    [6,0,0,5,0,0,0,0,0],
			    [0,0,0,0,1,0,7,8,0],
			    [5,0,0,0,0,9,0,0,0],
			    [0,0,0,0,0,0,0,4,0]]

const board3 = [[5,3,0,0,7,0,0,0,0],
			    [6,0,0,1,9,5,0,0,0],
			    [0,9,8,0,0,0,0,6,0],
			    [8,0,0,0,6,0,0,0,3],
			    [4,0,0,8,0,3,0,0,1],
			    [7,0,0,0,2,0,0,0,6],
			    [0,6,0,0,0,0,2,8,0],
			    [0,0,0,4,1,9,0,0,5],
			    [0,0,0,0,8,0,0,7,9]]

let triedBoards = [];

const boards = [board, board2, board3]

let boardNum;
let filled = false;


let intermedBoards = [] //store intermed values of board

// const board = [[1,1,1,2,6,1,7,1,1],
// 			   [6,8,1,1,7,1,1,9,1],
// 			   [1,9,1,1,1,4,5,1,1],
// 			   [8,2,1,1,1,1,1,4,1],
// 			   [1,1,4,6,1,2,9,1,1],
// 			   [1,5,1,1,1,3,1,2,8],
// 			   [1,1,9,3,1,1,1,7,4],
// 			   [1,4,1,1,5,1,1,3,6],
// 			   [7,1,3,1,1,8,1,1,1]] //testing for solved, dup funcs

function makeLines(){
	for(let i = 3; i < squares.length; i += 9){
			squares[i].style.borderLeft = "3px solid black";
	}

	for(let i = 6; i < squares.length; i += 9){
		squares[i].style.borderLeft = "3px solid black";	
	}

	for(let i = 18; i < 27; i += 1){
		squares[i].style.borderBottom = "3px solid black";
	}

	for(let i = 45; i < 54; i += 1){
		squares[i].style.borderBottom = "3px solid black";
	}
}

function fillBoard(board){
	clearBoard()
	let index = 0
	for(let i = 0; i < board.length; i++){
		for(j = 0; j < board[i].length; j++){
			if(board[i][j] != 0){
				let str = board[i][j].toString()
				let el_span = document.createElement("span")
				let el_spanClass = el_span.setAttribute("class", "num")

				squares[index].appendChild(el_span)
				el_span.appendChild(document.createTextNode(str))
			}
			index++
		}
	}
}

function clearBoard(){
	let spans = document.querySelectorAll("span")
	spans.forEach(span => {
		span.innerHTML = ""
	})
}

function clickCtr() {
	for(let i = 0; i < squares.length; i++){
		squares[i].onclick = () => {
			let el_span = document.querySelector("span")
			let containsSpan = squares[i].contains(el_span)
			if(!containsSpan){
				let num = prompt("Enter num: ", "")
				if(num != null){
					let create_span = document.createElement("span")
					let spanClass = create_span.setAttribute("class", "num")
					squares[i].appendChild(create_span)
					create_span.appendChild(document.createTextNode(num))
				}
			}
		}			
	}
}

function solveBoard(bd){
	if(solved(bd)){
		fillBoard(bd)
	}else{
		solveBoards(nextBoards(bd))
	}
}


function solveBoards(lobd){
	if(lobd.length == 0){
		return false
	}else{
		let first = lobd.pop()
		let tryFirst = solveBoard(first)
		if(!tryFirst){ //backtracking
			triedBoards.push(first)
			solveBoards(lobd)
		}else{
			tryFirst
		}
	}
}

//works, finds first empty space {row wise search}
function nextBoards(bd){
	for(let y = 0; y < bd.length; y++){
		for(let x = 0; x < bd[y].length; x++){
			if(bd[y][x] == 0){
				return makeNextBoards(bd, y, x)
			}
		}
	}
}

//works, takes empty space, makes 9 boards by filling the empty space with 1-9, returns the valid ones
function makeNextBoards(bd, y, x){
	let nextBoards = [] //list of next boards
	for(let i = 1; i < 10; i++){
		let newBoard = [...bd]
		let row = [...newBoard[y]]
		row[x] = i
		newBoard[y] = row
		nextBoards.push(newBoard)
	}
	return keepValid(nextBoards)
}

//working, returns valid boards from given list of boards
function keepValid(lobd){
	let valids = []
	for(let i = 0; i < lobd.length; i++){
		if(!dupRows(lobd[i]) && !dupColumns(lobd[i]) && !dupSubs(lobd[i])){
			valids.push(lobd[i])
		}
	}
	return valids
}

//works
function dupRows(bd){
	//true if duplicate exists, else false
	for(let r = 0; r < bd.length; r++){
		for(let i = 0; i < bd[r].length; i++){
			for(let j = i+1; j < bd[r].length; j++){
				if(bd[r][i] == bd[r][j] && bd[r][i] != 0){
					return true
				}
			}
		}
	}
	return false
}

//works
function dupColumns(bd){
	for(let c = 0; c < bd[1].length; c++){
		for(let r = 0; r < bd.length; r++){
			for(let j = r+1; j < bd.length; j++){
				if(bd[r][c] == bd[j][c] && bd[j][c] != 0){
					return true
				}
			}
		}
	}
	return false
}

//works
function dupSubs(bd){
	let boxes = []
	for(let i = 0; i < board.length; i++){
		boxes[i] = []
	}

	for(let i = 0; i < bd.length; i++){
		for(let j = 0; j < bd[i].length; j++){
			let cell = bd[i][j]
			if(cell !== 0){
				let boxIndex = Math.floor((i/3))*3 + Math.floor(j/3)
				if(boxes[boxIndex].includes(cell)){
					return true
				}else boxes[boxIndex].push(cell)
			}
		}
	}
	return false
}

//works, true if no blank spaces, else
function solved(bd){
	for(let i = 0; i < bd.length; i++) {
		for(let j = 0; j < bd[i].length; j++) {
			if(bd[i][j] == 0)
				return false
		}
	}
	return true
}

document.addEventListener("DOMContentLoaded", () => {
	makeLines()
	//clickCtr()
})


cbutton.onclick = function(){
	triedBoards = []
	boardNum = Math.random()*3 | 0;
	console.log(boardNum)
	fillBoard(boards[boardNum])
	filled = true;
}

sbutton.onclick = function(){
	if(filled){
		solveBoard(boards[boardNum])
	}else{
		alert("pls create a board")
	}
}

let interval = 0;
let index;
vbutton.onclick = function(){
	index = 0;
	interval = setInterval(visualizeBoards, 500)
}


function visualizeBoards(){
	if(index < triedBoards.length){
		fillBoard(triedBoards[index])
		index++
	}else{
		clearInterval(interval)
	}
}

	//to visualize, store current board state in array, fillBoard using array in setInterval
	//check after solving if the board still has empty spaces, if yes => current puzzle is unsolvable
	//fix player play along feature
	


//TODO include sudoku problem generator - varying difficulty, add option to make own problem
