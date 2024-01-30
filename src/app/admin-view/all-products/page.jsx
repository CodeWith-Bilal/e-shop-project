import CommonListing from '@/components/CommonListing/page'
import { getAllAdminProducts } from '@/services/product'
import React from 'react'

async function AdminAllProducts() {
    // const allAdminProducts = await getAllAdminProducts()
    // return <CommonListing data={allAdminProducts && allAdminProducts.data}/>
    return <h1>Admin Products</h1>
  }

export default AdminAllProducts
