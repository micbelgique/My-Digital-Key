import React from 'react';
import ReactInputRange from 'react-input-range';

const InputRange = ({ input, maxValue, step, meta: { touched, error, warning, pristine, form }, setValues }) => {
  const { max, min } = input.value || {max: 2500000, min: 0};
  return (
    <ReactInputRange
      maxValue={maxValue}
      minValue={0}
      step={step}
      value={{max, min}}
      onChange={(component, {max, min}) => setValues(max, min)}
    />
  );
};

export default InputRange;
