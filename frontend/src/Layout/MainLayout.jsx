import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MainLayout = () => {
  return (
    <>
      
      <Header />
      <Outlet />
      <ToastContainer />
    </>
  )
}

export default MainLayout