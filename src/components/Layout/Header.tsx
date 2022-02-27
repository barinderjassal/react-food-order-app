import { FC, createElement, Fragment } from 'react';
import { HeaderCartButton } from './HeaderCartButton';

import './styles/header.css';

const photo = require('../../assets/meals.jpeg');

export const Header: FC<{
  onShowCart: () => void;
}> = ({ onShowCart }) => {
  return (
    <Fragment>
      <header className="header">
        <h1>React Meals</h1>
        <HeaderCartButton onClickCartButton={onShowCart} />
      </header>
      <div className="main-image">
        <img src={photo.default} alt="a table full of food" />
      </div>
    </Fragment>
  );
};
