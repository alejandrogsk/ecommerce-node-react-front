/**
 * this is an object that centralizes the types of my actions 
 * to avoid making a mistake when writing the strings
 */

export const types = {

    //cart
    addProduct: '[cart] Add product',
    addQuantity: '[cart] Add cuantity',
    removeProduct: '[cart] Remove product',
    removeQuantity: '[cart] Remove cuantity',
    restartProducts: '[cart] Restart cart',

    //auth
    authCheckingFinish: '[auth] Finish checking login state',
    authStartLogin: '[auth] Start login',
    authLogin: '[auth] Login',
    authStartRegister: '[auth] Start Register',
    authStartStartTokenRenew: '[auth] Start token renew',
    authLogout: '[auth] Logout',

    //search
    searchStart: '[search] Search is true',
    searchSetValue: '[search] Value to find',
    searchFinish: '[search] Seatch is false'
}