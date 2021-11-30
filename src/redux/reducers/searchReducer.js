import { types } from "../types/types";

const initialState = {
    isTrue: false,
    searchProduct: null
} 

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
    
        case types.searchStart:
            return {
                ...state,
                isTrue: true
            }

        case types.searchSetValue: 
            return {
                ...state,
                search: action.payload
            }

        case types.searchFinish:
            return {
                ...state,
                isTrue: false
            }

        default:
            return state;
    }
}