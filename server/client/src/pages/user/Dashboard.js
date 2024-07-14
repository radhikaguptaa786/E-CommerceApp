import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
function Dashboard() {
  const [auth]=useAuth()
  return (
   <Layout title='Dashboard-ECommerce App'>
     <div className='container-fluid m-3 p-3'>
              <div className='row '>
                <div className='col-md-3'><UserMenu /></div>
                <div className='col-md-9'>
                  <div className='card w-90 p-3 m-4 '>
                      <h3>Hello {auth?.user?.name}</h3>
                  </div>
                 
                </div>
              </div>
            </div>
   </Layout>
  )
}

export default Dashboard
