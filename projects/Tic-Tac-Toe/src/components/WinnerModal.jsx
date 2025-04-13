import { Square } from "./Square.jsx"

export function winnerModal ({winner, resetGame}){
    if(winner === null) return null
    const winnertext = winner === flase ? 'Empate' : 'Gano: '
    return (
        <section className='winner'>
        <div className='text'>

            <h2>{winnertext}</h2>

            <header className='win'>
            {winner && <Square>{winner}</Square>}
            </header>

            <footer>
            <button onclick={resetGame}>Empezar de nuevo</button>
            </footer>
        </div>
        </section>
    )
}