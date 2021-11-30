import {types} from "../types/types"
import axios from "axios"
//Sweet Alert
import Swal from 'sweetalert2'

export const startLogin = (email, password) => {

    return async(dispatch) => {

        const url = `${ process.env.REACT_APP_BACKEND_API }/auth/login`;

        try{
            const {data} = await axios({ method: "POST", url, data: { email, password }});
            console.log(data);
            if( data.ok ) {

                localStorage.setItem("token", data.token);
                localStorage.setItem('token-init-date', new Date().getTime() );
        
                dispatch( login({
                    uid: data.user._id,
                    name: data.user.name            
                }));
            }

        } catch(error) {
            if (error.response) {
                Swal.fire({
                    text: `${error.response.data.message}`
                })
            } 
        }
    }
}

export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {
        const url = `${ process.env.REACT_APP_BACKEND_API }/auth/register`;
        try{
            const {data} = await axios({method: "POST", url, data: { email, password, name }})

            if( data.ok ) {
                localStorage.setItem('token', data.token );
                localStorage.setItem('token-init-date', new Date().getTime() );

                dispatch( login({
                    uid: data.user._id,
                    name: data.user.name,
                }))
            } 

        } catch(error) {
            //console.log("catch error in REGISTER", error.response)
            if (error.response) {
                Swal.fire({
                    text: `${error.response.data.message}`
                })
            } 
        } 
    }
}

export const startChecking = () => {
    return async(dispatch) => {
        const url = `${ process.env.REACT_APP_BACKEND_API }/auth/profile`;
        const token = localStorage.getItem('token') || '';

        try {
            const {data} = await axios({
                method: "GET",
                url,
                headers: { 'x-token': token }
            })
            
            if (data.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("token-init-date", new Date().getTime());

                dispatch( login({
                    uid: data.user._id,
                    name: data.user.name,
                }))
            } else {
                dispatch( checkingFinish() )
            }

            

        } catch (err) {
           console.log("catch error",err)
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish})

const login = ( user ) => {
    return {
        type: types.authLogin,
        payload: user
    }
}

export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.clear();
        dispatch( logout() );
    }
}

const logout = () => ({ type: types.authLogout })







