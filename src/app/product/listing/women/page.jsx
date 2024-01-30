import CommonListing from '@/components/CommonListing/page';
import { productByCategory } from '@/services/product';
import React from 'react'

 async function WomenAllProducts() {
    // const getAllProducts = await productByCategory("women");

    // return <CommonListing data={getAllProducts && getAllProducts.data} />;
    return <h1>women</h1>
  }

export default WomenAllProducts
