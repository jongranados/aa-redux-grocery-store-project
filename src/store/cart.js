const ADD_ITEM = 'cart/ADD_ITEM'; 
const REMOVE_ITEM = 'cart/REMOVE_ITEM'; 

// Redux Action for adding produce to cart state.
export function addToCart(id) { 
    return { 
        type: ADD_ITEM,
        id: id
    }
}

// Redux Action for removing produce from cart state. 
export function removeFromCart(id) {
    return {
        type: REMOVE_ITEM,
        id: id
    }
}


export default function cartReducer(state = {}, action) { 
    switch(action.type) { 
        case ADD_ITEM: 
            let count = state[action.id] ? state[action.id].count + 1 : 1; 
            return { ...state, [action.id]: { id: action.id, count: count }}; // note the obj key name must be computed using [action.id] syntax
        case REMOVE_ITEM: 
            let { [action.id]: removedItem, ...remainingItems } = state; // state destructured as two objects to prevent mutation: the removed item and remaining items
            return remainingItems;              
        default: 
            return state; 
    }
}; 
