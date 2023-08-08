import React from 'react';

function selectBox(props) {
  return (
    <select>
      {props.options.map((option) => (
        <option value={option.value} defaultValue={props.defaultValue === option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default selectBox;
