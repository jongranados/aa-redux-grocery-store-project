import produceData from '../mockData/produce.json'; 

const POPULATE = 'produce/POPULATE';
const UPDATE_LIKE_STATUS = 'produce/UPDATE_LIKE_STATUS'; 

// Redux Action for populating app with produce state. Dispatched in App component.
export function populateProduce() {
    return {
        type: POPULATE,
        produce: produceData
    }
}

// Redux Action for updating liked status in produce state. Dispatched in ProductDetails component.
export function updateLikeStatus(id) { 
    return { 
        type: UPDATE_LIKE_STATUS,
        id: id
    }
}

// Selector function - replaces useSelector functions in the ProduceList component
export const getAllProduce = (state) => Object.values(state.produce); 

// Reducer Helper function
function createState(produceArr) { 
    const newState = {}; 
    
    produceArr.forEach((produceObj) => {
        newState[produceObj.id] = produceObj;  
    }); 

    return newState; 
}

export default function produceReducer(state = {}, action) { 
    switch(action.type) { 
        case POPULATE: 
            return createState(action.produce); 
        case UPDATE_LIKE_STATUS: 
            return { ...state, [action.id]: { id: action.id, name: state[action.id].name, liked: !state[action.id].liked } }; // note the obj key name must be computed using [action.id] syntax
        default: 
            return state;
    }
}
