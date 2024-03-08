import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import styles from './DormSearchResultSlider.module.scss';

export default function DormSearchResultSlider({ onMinChange, onMaxChange, minValue, maxValue, step }) {
  const [value, setValue] = React.useState([minValue, maxValue]);

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
    <Box className={styles.box}>
      <Slider
        min={minValue}
        max={maxValue}
        value={value}
        step={step}
        marks
        onChange={handleChange}
        onChangeCommitted={handleCommittedChange}
        valueLabelDisplay="auto"
        valueLabelFormat={formatValue}
        sx={{
          '.MuiSlider-thumb': {
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 0px 14px 0px rgba(0, 0, 0, 0.25)',
          },
          '.MuiSlider-track': {
            backgroundColor: '#092F88',
          },
          '.MuiSlider-rail': {
            backgroundColor: '#D9D9D9',
          },
        }}
      />
      <div className={styles.label}>
        <span>{formatValue(value[0])}</span>
        <span>{formatValue(value[1])}</span>
      </div>
    </Box>
  );
}