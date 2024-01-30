import CommonDetails from '@/components/CommonDetails/page';
import { productById } from '@/services/product';
import React from 'react'

async function ProductDetails({ params }){
    // const productDetailsData = await productById(params.details);

    //
  
    // return <CommonDetails item={productDetailsData && productDetailsData.data} />;
    return <h1>product deatail page</h1>
  }

export default ProductDetails
