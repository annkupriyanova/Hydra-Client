import { combineReducers } from 'redux'
import { FETCH_EVENTS_REQUEST, 
        FETCH_EVENTS_SUCCESS, 
        FETCH_EVENTS_FAILURE,
        FETCH_PROP_NAMES_SUCCESS }  from '../actions/eventsActions'

const statusReducer = (state = "", action) => {
    switch (action.type) {
        case FETCH_EVENTS_REQUEST:
            return `Fetching...`;
        
        case FETCH_EVENTS_SUCCESS:
            return "Fetching is done successfully";

        case FETCH_EVENTS_FAILURE:
            return `Error occured while loading data: ${action.error.message}`;
        
        default:
            return state;
    }
}

const eventsReducer = (state = [], action) => {
    switch (action.type) { 
        case FETCH_EVENTS_SUCCESS:
            return [...action.events]; //?????[...state, ...action.events]
        
        default:
            return state;
    }
}

const serviceAddressReducer = (state = "", action) => {
    switch (action.type) { 
        case FETCH_EVENTS_REQUEST:
            return action.serviceAddress;
        
        default:
            return state;
    }
}

const propNamesReducer = (state = {}, action) => {
    switch (action.type) { 
        case FETCH_PROP_NAMES_SUCCESS:
            return action.propNames; 
        
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    status: statusReducer,
    events: eventsReducer,
    serviceAddress: serviceAddressReducer,
    propNames: propNamesReducer
})

export default rootReducer