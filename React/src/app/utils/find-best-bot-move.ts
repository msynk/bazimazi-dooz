import { P1, P2 } from "./players";
import { checkBoard } from "./check-board";
import { anyMovesLeft } from "./any-moves-left";

export function findBestBotMove(board: any[][]) {
    let bestScore = -Infinity;
    let movement;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == null) {
                board[i][j] = P2;
                let score = minimax(board, 0, false);
                board[i][j] = null;
                if (score > bestScore) {
                    bestScore = score;
                    movement = { i, j };
                }
            }
        }
    }
    return movement;
}

function minimax(board: any[][], depth: number, isMaximizing: boolean) {

    let current = isMaximizing ? P2 : P1;
    let winResult = checkBoard(board, current);

    if (winResult) return isMaximizing ? 1 : -1;
    if (anyMovesLeft(board)) return 0;

    if (isMaximizing) return findMaxMove(board, depth);
    return findMinMove(board, depth)

}
function findMaxMove(board: any[][], depth: number) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == null) {
                board[i][j] = P2;
                let score = minimax(board, depth + 1, false);
                board[i][j] = null;
                bestScore = Math.max(bestScore, score);
            }
        }
    }
    return bestScore;
}

function findMinMove(board: any[][], depth: number) {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == null) {
                board[i][j] = P1;
                let score = minimax(board, depth + 1, true);
                board[i][j] = null;
                bestScore = Math.min(bestScore, score);
            }
        }
    }
    return bestScore;
}
