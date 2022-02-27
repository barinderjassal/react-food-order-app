import { FC, createElement } from 'react';
import { useCartContext } from '../../../context/cart-context';
import { MealItemForm } from './MealItemForm';

import './styles/meal-item.css';

export const MealItem: FC<{
  name: string;
  description: string;
  price: number;
  id: string;
}> = ({ name, description, price, id }) => {
  const { addItem } = useCartContext();
  const mealPrice = `$${price.toFixed(2)}`;

  const addToCartHandler = (amount: number) => {
    const item = {
      id: id,
      name: name,
      amount: amount,
      price: price
    }
    addItem(item);
  }

  return (
    <li className="meal">
      <div>
        <h3>{name}</h3>
        <div className="description">{description}</div>
        <div className="price">{mealPrice}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  )
}