import './App.css'
import { useState, useEffect } from 'react'
import confetti from "canvas-confetti"
import { Square } from './components/Square.jsx'
import { TURN } from './constants.js'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURN.X
  })

  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURN.X ? TURN.O : TURN.X
    setTurn(newTurn)

    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURN.X)
    setWinner(null)

    resetGameStorage()
  }

  useEffect(()=>{
    saveGameToStorage({board: newBoard, turn: newTurn})
  }, [turn, board])

  return(
    <main className='board'>
      <h1>Tic Tac Toe</h1>

      <dibujarTabla board={board} updateBoard={updateBoard}></dibujarTabla>

      <section className='turn'>
        <Square isSelected={turn === TURN.X}>{TURN.X}</Square>
        <Square isSelected={turn === TURN.O}>{TURN.O}</Square>
      </section>

      <winnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}

export default App