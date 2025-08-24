export default function Square({ value, onSquareClick, highlight }) {
  return (
    <button
      className={`square ${highlight ? 'winner' : ''}`}
      onClick={onSquareClick}
      data-value={value || ''}
    >
      {value}
    </button>
  );
}