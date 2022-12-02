import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux'; 
import { clearCartOnPurchase } from '../../store/cart';
import { getCartItems } from '../../store/cart';
import './Cart.css';

function Cart() {
  const dispatch = useDispatch(); 

  const cartItems = useSelector(getCartItems)

  // const cart = useSelector((state) => state.cart);
  // const produce = useSelector((state) => state.produce); 

  // const cartItems = Object.values(cart)
  //   .map(item => {
  //     return {
  //       ...item,
  //       ...produce[item.id]
  //     };
  //   });

  if (!cartItems || !cartItems.length) return (
    <div className="cart">
      No items in the cart. Start selecting items to purchase.
    </div>
  );

  const onSubmit = dispatch => event => { // curried function in order to pass two args to handling function 
    event.preventDefault();
    window.alert(
      "Purchased the following:\n" +
      `${cartItems.map(item => `${item.count} of ${item.name}`).join('\n')}`
    );
    
    dispatch(clearCartOnPurchase());
  }

  return (
    <div className="cart">
      <ul>
        {cartItems.map(item => <CartItem key={item.id} item={item}/>)}
      </ul>
      <hr />
      <form onSubmit={onSubmit(dispatch)}>
        <button type="submit">Purchase</button>
      </form>
    </div>
  )
}

export default Cart;
