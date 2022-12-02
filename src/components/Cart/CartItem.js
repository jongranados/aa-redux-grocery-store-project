import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateProduceCount } from '../../store/cart';

function CartItem({ item }) {
  const [count, setCount] = useState(item.count);
  const dispatch = useDispatch(); 

  useEffect(() => {
    setCount(item.count);
  }, [item.count]);

  return (
    <li className="cart-item">
      <div className="cart-item-header">{item.name}</div>
      <div className="cart-item-menu">
        <input
          type="number"
          value={count}
          onChange={(event) => setCount(event.target.value)}
          onBlur={() => dispatch(updateProduceCount(item.id, count, 'override'))}
        />
        <button
          className="cart-item-button"
          onClick={() => dispatch(updateProduceCount(item.id, 1))}
        >
          +
        </button>
        <button
          className="cart-item-button"
          onClick={() => dispatch(updateProduceCount(item.id, -1))}
        >
          -
        </button>
        <button
          className="cart-item-button"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default CartItem;
