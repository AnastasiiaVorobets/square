import React, { useState, useEffect } from 'react';
import ModeSelector from './components/ModeSelector/ModeSelector';
import Field from './components/Field/Field';
import HoverSquare from './components/HoverSquare/HoverSquare';
import './App.scss';

const App = () => {
  const initialModesState = [];
  const initialHoveredSquaresState = [];
  const initialOptionSelectedState = false;

  const [modes, setModes] = useState(initialModesState);
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedModeTemp, setSelectedModeTemp] = useState(null);
  const [hoveredSquares, setHoveredSquares] = useState(initialHoveredSquaresState);
  const [optionSelected, setOptionSelected] = useState(initialOptionSelectedState);
  const [startButtonClicked, setStartButtonClicked] = useState(false);

  useEffect(() => {
    fetch('https://60816d9073292b0017cdd833.mockapi.io/modes')
      .then((response) => response.json())
      .then((data) => setModes(data))
      .catch((error) => console.error('Error fetching modes:', error));
  }, []);

  const handleModeSelect = (mode) => {
    setSelectedModeTemp(mode);
    setOptionSelected(true);
  };

  const handleStartButtonClick = () => {
    if (optionSelected) {
      setSelectedMode(selectedModeTemp);
      setStartButtonClicked(true);
      setHoveredSquares([]);
    } else {
      alert('Select an option before pressing the "START" button!');
    }
  };

  const handleSquareHover = (row, col) => {
    setHoveredSquares((prevSquares) => [...prevSquares, { row, col }]);
  };

  const handleReset = () => {
    setHoveredSquares(initialHoveredSquaresState);
    setOptionSelected(initialOptionSelectedState);
    setStartButtonClicked(false);
  };

  return (
    <div className="App">
      <div className="field">
        <ModeSelector modes={modes} onSelect={handleModeSelect} />
        <button onClick={handleStartButtonClick}>START</button>
        {startButtonClicked && selectedMode && (
          <Field
            selectedMode={selectedMode}
            gridSize={selectedMode.field}
            onHover={handleSquareHover}
            setHoveredSquares={setHoveredSquares}
          />
        )}
      </div>
      <div className="hover__square">
        <h2>Hovered Squares</h2>
        <HoverSquare squares={hoveredSquares} onClick={handleReset} />
      </div>
    </div>
  );
};

export default App;
