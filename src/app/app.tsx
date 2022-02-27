import {
  FC,
  createElement,
  useState,
} from 'react';
import { Header } from '../components';
import { Meals } from '../components';
import { Cart } from '../components/Cart';
import { CartContextProvider } from '../context/cart-context';

export const App: FC = () => {
  const [isCartShown, setIsCartShown] = useState(false);

  const showCartHandler = () => setIsCartShown(true);

  const hideCartHandler = () => setIsCartShown(false);

  return (
    <CartContextProvider>
      {isCartShown && <Cart onClose={hideCartHandler}/>}
      
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
};
