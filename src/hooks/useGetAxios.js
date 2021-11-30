import { useState, useEffect, useRef } from 'react';
import axios from "axios";

export const useGetAxios = ( url ) => {
    
    const isMounted = useRef(true);
    const [state, setState] = useState({data: null, loading: true, error: null});
    

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])


    useEffect(() => {

        setState({ data: null, loading: true, error: null });

        axios.get(url)
            .then( res => { 
                if( isMounted.current ) {
                    setState({
                        loading: false,
                        error: null,
                        data: res.data
                    });
                }
            })
            .catch( () => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                })
            })

    }, [ url ])

    return state;
}