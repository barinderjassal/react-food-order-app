import * as React from 'react';
import { FC, createElement } from 'react';

import './styles/input.css';

export const Input: FC<{
  label: string;
  input: any;
}> = React.forwardRef(({ label, input }, ref) => {
  return (
    <div className="input">
      <label htmlFor={input.id}>{label}</label>
      <input ref={ref} {...input}/>
    </div>
  );
})