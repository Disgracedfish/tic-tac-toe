//Player factory function
const player = function(playerName, playerMarker, markerColor) {

    const name = playerName;
    const marker = playerMarker;
    const color = markerColor;

    //const name = name;
    //const marker = marker;
    return {marker, name, color};
}


//Board module
const gameBoard = (function() {
    var board = [0,0,0,
                 0,0,0,
                 0,0,0];

    const isSquareEmpty = function(index) {
        return (board[index]===0);
    }

    const squareClicked = function(e) {

        if (!gameController.getGameStatus()) {return;}
        
        let index = e.target.dataset.boardindex;
        let marker = gameController.getCurrentPlayer().marker;
        let color = gameController.getCurrentPlayer().color;

        if (isSquareEmpty(index)){
            e.target.innerText = marker;
            e.target.style.color = color;
            updateBoardArray(marker, index);

            if(isWinner()) {
                gameController.gameEnd(true);
                return;
            } else if (isTie()) {
                gameController.gameEnd(false);
            } else {
                gameController.switchPlayer();
            }

            
        } 
    }

    const updateBoardArray = function(marker,index){
        if (marker ==='X') {
            board[index] = 1;
        } else {
            board[index] = -1;
        }
    }

    const isWinner = function() {
        //rows
        let winningCombos = [board[0] + board[1] + board[2],
                             board[3] + board[4] + board[5],
                             board[6] + board[7] + board[8],
                             board[0] + board[3] + board[6],
                             board[1] + board[4] + board[7],
                             board[2] + board[5] + board[8],
                             board[0] + board[4] + board[8],
                             board[6] + board[4] + board[2]
                            ]

        if (winningCombos.includes(3) || winningCombos.includes(-3)) {
            return true;
        } else {
            return false;
        }

    }

    const isTie = function() {
        return !board.includes(0);
    }

    const clearBoard = function(squares) {
        board = [0,0,0,
                0,0,0,
                0,0,0];

        for (let i = 0; i < squares.length;i++){
            squares[i].innerText='';
        }
        
    }
     
    return {squareClicked, clearBoard};
})();


//game controller module 
const gameController = (function() {
    
    var gameActive = true;

    // create Default players
    const player1 = player('Player 1', 'X', 'blue');
    const player2 = player('Player 2', 'O', 'red');

    var currentPlayer = player1;

    const statusDisplay = document.getElementById('status-display');

    // set click event listeners on board squares
    boardSquares = document.getElementsByClassName('square');
    for (let i = 0; i < boardSquares.length;i++){
        boardSquares[i].addEventListener('click', gameBoard.squareClicked);
    }

    const switchPlayer = function() {
        if (currentPlayer === player1){
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    const getCurrentPlayer = function() {
        return currentPlayer;
    }

    const resetGame = function() {
        gameBoard.clearBoard(boardSquares);
        currentPlayer = player1;
        statusDisplay.innerText = ' ';
        gameActive = true;
    }

    const gameEnd = function(isWinner) {
        gameActive = false;
        
        if (isWinner) {
            statusDisplay.innerText = `${currentPlayer.name} is the winner!`;
        } else {
            statusDisplay.innerText = `It's a tie!`
        }
    }

    const getGameStatus = function() {
        return gameActive
    }
    
    const resetButton = document.getElementById('game-restart');
    resetButton.addEventListener('click', resetGame);

    const gameStatusBar = document.getElementById('game-status');

    return {getCurrentPlayer, switchPlayer, gameEnd, getGameStatus};

})();

