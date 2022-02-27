import { FC, createElement, Fragment, useEffect, useState } from 'react';
import { useCartContext } from '../../context/cart-context';
import { CartIcon } from '../Cart';

import './styles/header-cart-button.css';

export const HeaderCartButton: FC<{
  onClickCartButton: () => void;
}> = ({ onClickCartButton }) => {
  const { items } = useCartContext();
  const [btnIsBumped, setBtnIsBumped] = useState(false);

  const numberOfCartItems = items.reduce((currentNumber: number, item: any) => {
    return currentNumber + item.amount;
  }, 0);

  const btnClasses = `button ${btnIsBumped ? 'bump': ''}`;

  useEffect(() => {
    if (!items.length) {
      return;
    }
    setBtnIsBumped(true);

    const timer = setTimeout(() => {
      setBtnIsBumped(false);
    }, 300)

    //cleanup the timer before next call came before 300ms
    return () => {
      clearTimeout(timer);
    }
  }, [items]);

  return (
    <Fragment>
      <button className={btnClasses} onClick={onClickCartButton}>
        <span className="icon">
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className="badge">
          {numberOfCartItems}
        </span>
      </button>
    </Fragment>
  );
};
