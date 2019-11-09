import React from 'react';
import Select from 'react-select';
import { difficulties } from '../lib/difficulties';

const OPTIONS = Object.keys(difficulties)
  .map((key) => ({
    value: key,
    label: uppercase(key)
  }));

function uppercase(str) {
  return `${ str[0].toUpperCase() }${ str.slice(1) }`;
}

export default function Difficulty({ difficulty, setDifficulty }) {
  return (
    <div className='difficulty'>
      <div className='difficulty__selector' style={{textAlign: 'left'}}>
        <h3>Select Difficulty</h3>
        <Select options={OPTIONS} onChange={setDifficulty}/>
      </div>
    </div>
  )
}
