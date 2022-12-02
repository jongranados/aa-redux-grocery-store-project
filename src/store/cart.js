const ADD_ITEM = 'cart/ADD_ITEM'; 
const REMOVE_ITEM = 'cart/REMOVE_ITEM'; 
const UPDATE_COUNT = 'cart/UPDATE_ITEM';
const CLEAR_CART = 'cart/CLEAR_CART'

// Redux Action for adding produce to cart state. Dispatched in ProduceList component. 
export function addToCart(id) { 
    return { 
        type: ADD_ITEM,
        id: id
    }
};

// Redux Action for removing produce from cart state. Dispatched in Cart component.  
export function removeFromCart(id) {
    return {
        type: REMOVE_ITEM,
        id: id
    }
};

// Redux Action for updating produce count from cart state. Dispatched in Cart component.
export function updateProduceCount(id, delta, operation) { 
    return { 
        type: UPDATE_COUNT, 
        id: id, 
        delta: delta,
        operation: operation
    }
};

// Redux Action for clearing produce count from cart state upon produce purchase. Dispatched in Cart component. 
export function clearCartOnPurchase() { 
    return { 
        type: CLEAR_CART
    }
}

// Selector function - DRYs useSelector functionality in Cart component. 
export function getCartItems (state) { 
    const cart = state.cart;
    const produce = state.produce; 

    const cartItems = Object.values(cart)
        .map(item => {
            return {
                ...item,
                ...produce[item.id]
            };
        });

    return cartItems; 
}

// Reducer function
export default function cartReducer(state = {}, action) { 
    switch(action.type) { 
        case ADD_ITEM: 
            let count = state[action.id] ? state[action.id].count + 1 : 1; 
            return { ...state, [action.id]: { id: action.id, count: count }}; // note the obj key name must be computed using [action.id] syntax
        
        case REMOVE_ITEM: 
            let { [action.id]: removedItem, ...remainingItems } = state; // state destructured as two objects to prevent mutation: the removed item and remaining items
            return remainingItems;              
        
        case UPDATE_COUNT:  
            let newCount = (action.operation === 'override') ? Number(action.delta) : state[action.id].count + action.delta; 
            
            if (newCount > 0) {
                return { ...state, [action.id]: { id: action.id, count: newCount } };
            } else { 
                let { [action.id]: removedItem, ...remainingItems } = state;
                return remainingItems; 
            }; 
        case CLEAR_CART: 
            return {}
        default: 
            return state; 
    }
}; 
