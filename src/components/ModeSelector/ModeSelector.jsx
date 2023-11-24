import React, { useState } from 'react';
import './ModeSelector.scss';

const ModeSelector = ({ modes, onSelect }) => {
  const [selectedModeId, setSelectedModeId] = useState('');

  const handleSelectChange = (e) => {
    const selectedModeId = e.target.value;
    setSelectedModeId(selectedModeId);

    const selectedMode = modes.find((mode) => mode.id === selectedModeId);
    onSelect(selectedMode);
  };

  return (
    <div className='select'>
      <select onChange={handleSelectChange} value={selectedModeId}>
        <option value={''}>Pick mode</option>
        {modes.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModeSelector;
