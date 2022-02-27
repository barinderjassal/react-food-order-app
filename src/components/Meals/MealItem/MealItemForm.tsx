import { createElement, FC, Fragment, useRef, useState } from 'react';
import { Input } from '../../UI';

import './styles/meal-item-form.css';

export const MealItemForm: FC<{
  id: string;
  onAddToCart: (val: number) => void;
}> = ({ id, onAddToCart }) => {
  const amountInputRef = useRef('' as any);

  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event: any) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setAmountIsValid(false);
      return;
    }
    onAddToCart(enteredAmountNumber);
  }

  return (
    <Fragment>
      <form className="form" onSubmit={submitHandler}>
        <Input
          label="Amount"
          input={{
            id: 'amount_' + id,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1',
            ref: amountInputRef
          }}
        />
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
      </form>
    </Fragment>
  );
}