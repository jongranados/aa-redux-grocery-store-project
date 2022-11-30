import produceData from '../mockData/produce.json'; 

const POPULATE = 'produce/POPULATE';
export function populateProduce() {
    return {
        type: POPULATE,
        produce: produceData
    }
}

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
        default: 
            return state;
    }
}
