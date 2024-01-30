import CommonListing from '@/components/CommonListing/page';
import { productByCategory } from '@/services/product';
import React from 'react'

 async function MenAllProducts() {
    const getAllProducts = await productByCategory("men");

    return <CommonListing data={getAllProducts && getAllProducts.data} />;
  }

export default MenAllProducts
