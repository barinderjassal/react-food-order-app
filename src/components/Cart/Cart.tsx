import { FC, createElement, useState, Fragment } from 'react';
import { useCartContext, Item } from '../../context/cart-context';
import { useHttp } from '../../hooks/use-http';
import { Modal } from '../UI';
import { CartItem } from './CartItem';
import { Checkout } from './Checkout';
import './styles/cart.css';

export const Cart: FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  // get items from context
  const { items: cartItems, totalAmount, addItem, removeItem, clearCart } = useCartContext();
  const { sendRequest: orderMeals } = useHttp();

  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const finalAmountOfCart = `$${totalAmount.toFixed(2)}`;

  const onCartAddItemHandler = (item: Item) => {
    addItem({ ...item, amount: 1 });
  };

  const onCartRemoveItemHandler = (id: string) => {
    removeItem(id);
  };

  const orderHandler = () => {
    setShowCheckout(true);
  }

  const SubmitUserData = (userData: any) => {
    setIsSubmitting(true);
    orderMeals(
      {
        url: 'https://react-http-practice-c7fbb-default-rtdb.firebaseio.com/orders.json',
        method: 'POST',
        body: {
          user: userData,
          orderedItems: cartItems
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    clearCart(); // clear the cart after submitting the data
  }

  const cartContent = (
    <ul className="cart-items">
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={onCartAddItemHandler.bind(null, item)}
          onRemove={onCartRemoveItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const actionButtons = (
    <div className="actions">
      <button className="button--alt" onClick={onClose}>Close</button>
      {cartItems.length > 0 && (
        <button className="button--alt order-button" onClick={orderHandler}>Order</button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartContent}
      
      {/* total amount  */}
      <div className="total">
        <span>Total Amount</span>
        <span>{finalAmountOfCart}</span>
      </div>

      {/*  Checkout Form */}
      {showCheckout && <Checkout onCancel={onClose} onSubmitUserData={SubmitUserData} />}

      {/* actions for the cart */}
      {!showCheckout && actionButtons}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <Fragment>
      <p>Order Successfully placed!</p>
      <div className="actions">
        <button className="button--alt" onClick={onClose}>Close</button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClickOutside={onClose}>

      {/* neither submitting nor did submit */}
      {!isSubmitting && !didSubmit && cartModalContent}

      {isSubmitting && isSubmittingModalContent}

      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
}