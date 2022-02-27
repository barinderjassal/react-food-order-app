import { createElement, FC } from 'react';

import './styles/card.css';

export const Card: FC = (props) => {
  return (
    <div className='card'>
      {props.children}
    </div>
  )
}