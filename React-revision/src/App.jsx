import { useState } from 'react';

export default function App() {
  return (
    <Board />
  )
}

function Board() {
  return (
    <div className="board">
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </div>
  )
}

function Square(){
  const [value,setValue] = useState('')
  function handleClick(){
    setValue('X');
  }
  return (
    <button className="square" onClick={handleClick}>{value}</button>
  )
}