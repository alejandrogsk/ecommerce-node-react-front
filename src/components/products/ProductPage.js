import React from 'react'
import {useParams} from 'react-router-dom'
import { useGetAxios } from '../../hooks/useGetAxios';
import { ProductScreen } from './ProductScreen';
import { ProductScreenSkeleton } from './ProductScreenSkeleton';

const ProductPage = () => {
    const {productId} = useParams();
    const {data, loading, error} = useGetAxios(`${process.env.REACT_APP_BACKEND_API}/product/${productId}`)


    return (
        <div style={{flexGrow: 1, overflow: "hidden"}}>
            {error ? <h1>error</h1> : "" }
            {
                !loading
                    ? <ProductScreen productFetch={data}/>
                    : <ProductScreenSkeleton />
            }
        </div>
    )
}

export default ProductPage;