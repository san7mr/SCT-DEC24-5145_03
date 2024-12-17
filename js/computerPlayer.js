export class ComputerPlayer {
    calculateMove(gameBoard) {
        const emptyCells = gameBoard.getEmptyCells();
        if (emptyCells.length === 0) return null;
        
        // Simple AI: randomly choose an empty cell
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }
}