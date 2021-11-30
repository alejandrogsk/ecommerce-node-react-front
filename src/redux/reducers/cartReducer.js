import { types } from "../types/types";

const initialState = {
    products: []
}

export const cartReducer = (state = initialState, action) => {

    switch ( action.type ) {
        case types.addProduct:

            return { 
                ...state, 
                products: [...state.products, action.payload] 
            };

        case types.addQuantity:
            return {
                ...state,
                products:[
                    ...state.products.map(product => {return product._id === action.payload._id ? {...product, quantity: (product.quantity += 1)} : product})
                ]
            }
        
        case types.removeProduct: 
            return {
                products: [
                    ...state.products.filter(product => product._id !== action.payload._id)
                ],
            }
        
        case types.removeQuantity:
            return {
                ...state,
                products:[
                    ...state.products.map(product => {return product._id === action.payload._id ? {...product, quantity: (product.quantity - 1)} : product})
                ]
            }
    
        case types.restartProducts:
            return state = initialState

        default:
            return state;
    }

}


