import React from 'react';
import './HoverSquare.scss';

const HoverSquare = ({ squares }) => {
  const uniqueSquares = [...new Map(squares.map(square => [`${square.row}-${square.col}`, square])).values()];

  return (
    <div>
      {uniqueSquares && uniqueSquares.length > 0 ? (
        <ul className='list'>
          {uniqueSquares.map(({ row, col }, index) => (
            <li key={index} className='list__item'>
              Row: {row + 1} | Col: {col + 1}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hovered squares</p>
      )}
    </div>
  );
};

export default HoverSquare;
