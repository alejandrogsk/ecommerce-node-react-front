import { types } from "../types/types"


export const addProduct = (products) => {
    return {
        type: types.addProduct,
        payload: products
    }
}

export const addQuantity = (product) => {
    return {
        type: types.addQuantity,
        payload: product
    }
}

export const removeProduct = (product) => {
    return {
        type: types.removeProduct,
        payload: product
    }
}

export const removeQuantity = (product) => {
    return {
        type: types.removeQuantity,
        payload: product
    }
}

export const restartProducts = () => {
    return {type: types.restartProducts}
}

/** son la misma funcion
 export const addProduct = (productId) => ({
    type: types.addProduct,
    payload: {
        productId
    }
})
 */