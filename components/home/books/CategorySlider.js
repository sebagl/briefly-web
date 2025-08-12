import React from 'react';
import { Slide } from '@mui/material';

const CategorySlider = (props) => {
  return (
    <div><Slide children={props.children}/></div>
  );
};

export default CategorySlider;