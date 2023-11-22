import React, { useState, useEffect } from 'react';
import './Field.scss';

const Field = ({ selectedMode, onHover }) => {
  const [field, setField] = useState(null);
  const [hoveredSquares, setHoveredSquares] = useState([]);
  let gridSize = field || 3;

  useEffect(() => {
    if (selectedMode && selectedMode.field) {
      setField(selectedMode.field);
      setHoveredSquares([]);
    }
  }, [selectedMode]);

  const handleSquareHover = (row, col) => {
    onHover(row, col);
    const isSquareHovered = hoveredSquares.some(
      (square) => square.row === row && square.col === col
    );

    if (isSquareHovered) {
      setHoveredSquares((prevSquares) =>
        prevSquares.filter(
          (square) => square.row !== row || square.col !== col
        )
      );
    } else {
      setHoveredSquares((prevSquares) => [...prevSquares, { row, col }]);
    }
  };

  const maxFieldWidth = 600;
  const cellSize = `calc(${maxFieldWidth / gridSize}px - 1px)`;

  const fieldStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize}, ${cellSize})`,
    gridTemplateRows: `repeat(${gridSize}, ${cellSize})`,
    gridGap: '1px',
    marginTop: '20px',
    maxWidth: `${maxFieldWidth}px`,
    width: '100%',
  };

  return (
    <div className="field" style={fieldStyle}>
      {Array.from({ length: gridSize * gridSize }, (_, index) => (
        <div
          key={index}
          className={`grid-square ${
            hoveredSquares.some(
              (square) =>
                square.row === Math.floor(index / gridSize) &&
                square.col === index % gridSize
            )
              ? 'hovered'
              : ''
          }`}
          onMouseOver={() =>
            handleSquareHover(
              Math.floor(index / gridSize),
              index % gridSize
            )
          }
        ></div>
      ))}
    </div>
  );
};

export default Field;
