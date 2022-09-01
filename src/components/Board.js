import React, { useState } from 'react'
import Square from './Square'

function Board() {
    const initialValue = Array(9).fill(null);
    const [state, setState] = useState(initialValue)
    const[isXTurn, setIsXTurn] = useState(true)
    const [count, setCount] = useState(null)

    const checkWinner = () => {
        const winnerLogic = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ]

        for (let logic of winnerLogic){
            const [a,b,c] = logic;
            if(state[a] !== null && state[a] === state[b] && state[a] === state[c]){
                // setCount(null)
                return state[a];
            }
        }
        return false
    }

    const isWinner = checkWinner();

    const handleClickState = (index) => {
        setCount(prev => prev + 1)
        if(state[index] !== null){
            return;
        }
        const copyState = [...state]
        copyState[index] = isXTurn ? "X" : "O"
        setState(copyState)        
        setIsXTurn(!isXTurn)
    }

    const handleReset = () => {
        setState(initialValue);
        setIsXTurn(true);
    }

  return (
    <div className='board-container'>
        {!isWinner && count !== 9 ? <h4>Player {isXTurn ? "X" : "O"} Please move</h4> : ""}
        {isWinner ? <>{isWinner} won the game <button onClick={handleReset}>Play Again</button> </> : 
        count === 9 ? <>Match is tie <button onClick={handleReset}>Play Again</button></> :
        <><div className='board-row'>
            <Square value={state[0]} handleClick={() => handleClickState(0)} />
            <Square value={state[1]} handleClick={() => handleClickState(1)}/>
            <Square value={state[2]} handleClick={() => handleClickState(2)}/>
        </div>
        <div className='board-row'>
            <Square value={state[3]} handleClick={() => handleClickState(3)}/>
            <Square value={state[4]} handleClick={() => handleClickState(4)}/>
            <Square value={state[5]} handleClick={() => handleClickState(5)}/>
        </div>
        <div className='board-row'>
            <Square value={state[6]} handleClick={() => handleClickState(6)}/>
            <Square value={state[7]} handleClick={() => handleClickState(7)}/>
            <Square value={state[8]} handleClick={() => handleClickState(8)}/>
        </div></>}
    </div>
  )
}

export default Board