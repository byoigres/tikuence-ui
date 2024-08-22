import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';

const InputHelpAdornment = ({ title = '', position = 'end' }) => (
  <InputAdornment position={position}>
    <Tooltip title={title} enterTouchDelay={50} leaveTouchDelay={4000}>
      <HelpIcon />
    </Tooltip>
  </InputAdornment>
);

export default InputHelpAdornment;
