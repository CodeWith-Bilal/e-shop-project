import CommonDetails from '@/components/CommonDetails/page';
import { productById } from '@/services/product';
import React from 'react'

async function ProductDetails({ params }){
    const productDetailsData = await productById(params.details);

    //
  
    return <CommonDetails item={productDetailsData && productDetailsData.data} />;
  }

export default ProductDetails
