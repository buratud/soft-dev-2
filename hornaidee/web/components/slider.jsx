import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function RangeSlider({ onMinChange, onMaxChange }) {
  const [value, setValue] = React.useState([0, 10000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCommittedChange = (event, newValue) => {
    onMinChange(newValue[0]);
    onMaxChange(newValue[1]);
  };

  const formatValue = (value) => {
    return value.toLocaleString();
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        min={0}
        max={10000}
        value={value}
        step={1000}
        marks
        onChange={handleChange}
        onChangeCommitted={handleCommittedChange}
        valueLabelDisplay="auto"
        valueLabelFormat={formatValue}
        sx={{
          '& .MuiSlider-thumb': {
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 0px 14px 0px rgba(0, 0, 0, 0.25)',
          },
          '& .MuiSlider-track': {
            backgroundColor: '#092F88',
          },
          '& .MuiSlider-rail': {
            backgroundColor: '#D9D9D9',
          },
        }}
      />
    </Box>
  );
}
