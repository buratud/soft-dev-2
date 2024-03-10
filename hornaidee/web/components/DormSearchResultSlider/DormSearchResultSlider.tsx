import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import styles from './DormSearchResultSlider.module.scss';

export default function DormSearchResultSlider({onChange, initValue, minValue = 0, maxValue, step, suffix = ""}) {
  const [value, setValue] = React.useState(initValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCommittedChange = (event, newValue) => {
    onChange(newValue);
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
        <span/>
        <span>{formatValue(value)}{suffix && <>&nbsp;</>}{suffix}</span>
      </div>
    </Box>
  );
}