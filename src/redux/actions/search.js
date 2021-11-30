import { types } from "../types/types"

export const searchStart = () => {
    return {
        type: types.searchStart
    }
}

export const searchFinish = () => {
    return {
        type: types.searchFinish
    }
}

