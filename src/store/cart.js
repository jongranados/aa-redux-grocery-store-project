const ADD_ITEM = 'cart/ADD_ITEM'; 

export function addToCart(id) { 
    return { 
        type: ADD_ITEM,
        id: id
    }
}

export default function cartReducer(state = {}, action) { 
    switch(action.type) { 
        case ADD_ITEM: 
            const count = state[action.id] ? state[action.id].count + 1 : 1; 
            return { ...state, [action.id]: { id: action.id, count: count }}; // note the obj key name must be computed using [action.id] syntax
        default: 
            return state; 
    }
}; 
