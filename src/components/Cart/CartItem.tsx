import { FC, createElement } from 'react';

import './styles/cart-item.css';

export const CartItem: FC<{
  name: string;
  price: number;
  amount: number;
  onRemove: () => void;
  onAdd: () => void;
}> = ({ name, price, amount, onRemove, onAdd}) => {
  const priceFormatted = `$${price.toFixed(2)}`;
  return (
    <li className='cart-item'>
      <div>
        <h2>{name}</h2>
        <div className='item-summary'>
          <span className='price'>{priceFormatted}</span>
          <span className='amount'>x {amount}</span>
        </div>
      </div>
      <div className='cart-button-actions'>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
}