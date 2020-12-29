import React from 'react';
import fs from 'fs';

export default function Main() {
  const filenames = fs.readdirSync('.');
  const names = filenames.map((name) => {
    return <li key={name}>{name}</li>;
  });
  return (
    <div>
      <div className="Main">
        <ul style={{ overflow: 'auto', height: '300px' }}>{names}</ul>
      </div>
    </div>
  );
}
