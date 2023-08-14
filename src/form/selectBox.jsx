import React from 'react';
import { nanoid } from '@reduxjs/toolkit';

function selectBox(props) {
  return (
    <select value={props.value} onChange={props.onChange}>
      {props.options.map((option) => (
        <option key={nanoid()} value={option.value} defaultValue={props.defaultValue === option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default selectBox;
