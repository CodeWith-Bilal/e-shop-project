import CommonListing from '@/components/CommonListing/page';
import { productByCategory } from '@/services/product';
import React from 'react'

 async function KidsAllProducts() {
    const getAllProducts = await productByCategory("kids");

    return <CommonListing data={getAllProducts && getAllProducts.data} />;
  }

export default KidsAllProducts
