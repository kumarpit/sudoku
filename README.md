# Sudoku
This application allows the user to solve sudoku puzzles of varying difficulty. It utilizes a backtracking algorithm to provide solutions of any sudoku board and gives the user the option to visualize the algorithm at work.

# How the Backtracking Algorithm works
The first empty square in the board is found (row wise search) and is filled with the first valid value for that square. This becomes the new board and the proccess is repeated. If a situation where no valid values are possible for a given square is encountered, the algorithm goes back to the previously filled square, fills in the next valid value for that square and continues. This process is repeated until there are no empty squares on the board - the board is solved - or if all possible valid values are exhausted and empty squares still exist - the board is unsolvable.

# Visualization
The visualization works by keeping track of all changes made to the board in an array. Whenever a number is filled to the board, a copy of the board is made and added to an array. When the user clicks on the visualize button, all boards in this array are shown with an interval.

# To-Do
Add OCR to enable user to upload photo of sudoku puzzle and the app can overlay the solution over the uploaded picture.

