import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@/widgets/header'
import { ToastContainer } from 'react-toastify'
import { Footer } from '@/widgets/footer/ui/Footer'
import { Tooltip } from '@/shared/ui/tooltip'

const Layout = () => {
  return (
    <div className="flowContainer">
      <Header />
      <div className="container">
        <Outlet />
      </div>
      <ToastContainer
        position="bottom-left"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Footer />
    </div>
  )
}

export default Layout
