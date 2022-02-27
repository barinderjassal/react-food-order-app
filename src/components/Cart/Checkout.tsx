import { createElement, FC, useRef, useState } from 'react';

import './styles/checkout.css';

const isEmpty = (value: string) => value.trim() === '';
const isSixDigit = (value: string) => value.length === 6;

export const Checkout: FC<{
  onCancel: () => void;
  onSubmitUserData: (value: any) => void;
}> = ({ onCancel, onSubmitUserData }) => {
  const nameInputRef = useRef('' as any);
  const streetInputRef = useRef('' as any);
  const postalCodeInputRef = useRef('' as any);
  const cityInputRef = useRef('' as any);

  const [formInputsValid, setFormInputsValid] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true
  })

  const onSubmit = (event: any) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const formIsValid =
      !isEmpty(enteredName) &&
      !isEmpty(enteredStreet) &&
      !isEmpty(enteredCity) &&
      isSixDigit(enteredPostalCode);

    setFormInputsValid({
      name: !isEmpty(enteredName),
      street: !isEmpty(enteredStreet),
      postalCode: isSixDigit(enteredPostalCode),
      city: !isEmpty(enteredCity),
    })
    
    if (!formIsValid) {
      return;
    }
    
    onSubmitUserData({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity
    });

    nameInputRef.current.value = '';
    streetInputRef.current.value = '';
    postalCodeInputRef.current.value = '';
    cityInputRef.current.value = '';
  }

  return (
    <form className="address-form" onSubmit={onSubmit}>
      <div className={`user-controls ${formInputsValid.name ? '' : 'invalid'}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" name="name" id="name" ref={nameInputRef} />
        {!formInputsValid.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={`user-controls ${formInputsValid.street ? '' : 'invalid'}`}>
        <label htmlFor="street">Street</label>
        <input type="text" name="street" id="street" ref={streetInputRef} />
        {!formInputsValid.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={`user-controls ${formInputsValid.postalCode ? '' : 'invalid'}`}>
        <label htmlFor="postal-code">Postal Code</label>
        <input type="text" name="postal" id="postal" ref={postalCodeInputRef} />
        {!formInputsValid.postalCode && <p>Please enter a valid postal code! (maximum six characters)</p>}
      </div>
      <div className={`user-controls ${formInputsValid.city ? '' : 'invalid'}`}>
        <label htmlFor="city">City</label>
        <input type="text" name="city" id="city" ref={cityInputRef} />
        {!formInputsValid.city && <p>Please enter a valid city!</p>}
      </div>
      <div className="form-actions">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button className="submit-user-form">Confirm</button>
      </div>
    </form>
  )
}