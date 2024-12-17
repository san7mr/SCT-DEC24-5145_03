import { GameBoard } from './gameBoard.js';
import { GameController } from './gameController.js';
import { ComputerPlayer } from './computerPlayer.js';
import { UIController } from './uiController.js';

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = new GameBoard();
    const computerPlayer = new ComputerPlayer();
    const gameController = new GameController(gameBoard);
    const uiController = new UIController(gameBoard, gameController, computerPlayer);

    uiController.initializeGame();
});