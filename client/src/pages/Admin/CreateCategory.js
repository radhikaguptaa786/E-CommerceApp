import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const CreateCategory = () => {
  return (
    <>
     <Layout title={'createCategory'}>
     <div className='container-fluid m-3 p-3'>
           <div className='row'>
            <div className='col-md-3'>
              <AdminMenu/>
            </div>
            <div className='col-md-6'>
                <h3>CAtegories</h3>
            </div>
           </div>
        </div>
        </Layout>
      
    </>
  )
}

export default CreateCategory
