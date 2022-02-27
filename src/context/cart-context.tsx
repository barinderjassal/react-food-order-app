import { createContext, createElement, useContext, useReducer } from 'react';

export interface Item {
  id: string;
  name: string;
  amount: number;
  price: number;
}

interface CartContextType {
  items: Item[];
  totalAmount: number;
  addItem: (item: any) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  items: [],
  totalAmount: 0,
  addItem: (item) => { },
  removeItem: (id) => { },
  clearCart: () => { }
});

interface CartType {
  items: Item[];
  totalAmount: number;
}

/**
 * Set Default State for the Cart
 */
const defaultCartState: CartType = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state: CartType, action: any) => {
  if (action.type === 'ADD_ITEM') {
    const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;

    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
    // get the existing cart item which you want to update
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      // update the item object for which you want to add. e.g. increase pizza by 1
      const updatedSingleItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.payload.amount
      }
      //copying an existing array
      updatedItems = [...state.items];
      //update that particular item at that index with updated single item
      updatedItems[existingCartItemIndex] = updatedSingleItem;
    } else {
      updatedItems = state.items.concat(action.payload);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if (action.type === 'REMOVE_ITEM') {
    //get the index of the item for which remove action is triggered
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);

    // get the item by using index evaluated above
    const existingItem = state.items[existingCartItemIndex];

    // now update the total amount by subtracting the price of the item to be removed
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    /**
     * Check if the selected item is present in the cart and
     * what is its number/amount/quantity
     */
    if (existingItem.amount === 1) {
      // remove item from Cart
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedSingleItem = {
        ...existingItem,
        amount: existingItem.amount - 1
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedSingleItem;
    }

    //return the updated state
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  if (action.type === 'CLEAR') {
    return defaultCartState;
  }

  // return default state if some other action is triggered
  return defaultCartState;
}

export const CartContextProvider = ({ children }: any) => {
  const [cartState, dispatchCartEvent] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item: any) => {
    dispatchCartEvent({
      type: 'ADD_ITEM',
      payload: item
    });
   };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCartEvent({
      type: 'REMOVE_ITEM',
      id: id
    });
  };

  const clearCartHandler = () => {
    dispatchCartEvent({
      type: 'CLEAR'
    })
  }

  return (
    <CartContext.Provider value={{
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: addItemToCartHandler,
      removeItem: removeItemFromCartHandler,
      clearCart: clearCartHandler
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => useContext(CartContext);