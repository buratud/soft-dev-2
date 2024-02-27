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

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        min={0} // กำหนดค่า min เป็น 0
        max={10000} // กำหนดค่า max เป็น 10000
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleCommittedChange} //ส่งข้อมูลตอนปล่อย
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
