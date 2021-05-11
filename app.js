document.addEventListener("DOMContentLoaded", () => {
	
	const squares = document.querySelectorAll(".board div")
	const board = [[0,0,0,2,6,0,7,0,1],
				   [6,8,0,0,7,0,0,9,0],
				   [1,9,0,0,0,4,5,0,0],
				   [8,2,0,1,0,0,0,4,0],
				   [0,0,4,6,0,2,9,0,0],
				   [0,5,0,0,0,3,0,2,8],
				   [0,0,9,3,0,0,0,7,4],
				   [0,4,0,0,5,0,0,3,6],
				   [7,0,3,0,1,8,0,0,0]]
	

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

	function fillBoard(){
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


	makeLines()
	fillBoard()
	clickCtr()

})
