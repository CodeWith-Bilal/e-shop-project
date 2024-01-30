import CommonListing from '@/components/CommonListing/page';
import { getAllAdminProducts } from '@/services/product';
import React from 'react'

async function AllProducts() {
    const getAllProducts = await getAllAdminProducts();

    return <CommonListing data={getAllProducts && getAllProducts.data} />;
  }

export default AllProducts
