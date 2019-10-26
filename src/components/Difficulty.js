import React from 'react';
import Select from 'react-select';
import { difficulties } from '../lib/difficulties';

const OPTIONS = Object.keys(difficulties).map((key) => ({ value: key, label: uppercase(key) }));

function uppercase(str) {
  return `${ str[0].toUpperCase() }${ str.slice(1) }`;
}

export default function Difficulty(props) {
  return (
    <div className='difficulty'>
      <div className='difficulty__selector'>
        <h3>Select Difficulty</h3>
        <Select options={OPTIONS} value={props.difficulty} onChange={(selection) => props.setDifficulty(selection.value)}/>
      </div>
    </div>
  )
}
