// import '../../scss/style.scss'
import "../scss/style.scss"
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import LayoutCss from './layout.module.css'

const DefaultLayout = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const ADtoken = JSON.parse(localStorage.getItem('ADtoken'));

    if (!ADtoken) {
      navigate("/login");
    }
  }, []);

  return (
    <div className={LayoutCss.dsakfslf}>
      {/* App Sidebar Component */}
      <AppSidebar />

      <div className="wrapper d-flex flex-column min-vh-100 bg-light">

        {/* App Header component */}
        <AppHeader />

        <div style={{ color: "black", fontFamily: "system-ui, -apple-system, Segoe UI", backgroundColor: "#f7f8fd" }} className="body flex- grow - 1 px-3">
          <AppContent />
        </div>

        {/* App Footer component */}
        {/* <AppFooter /> */}
      </div>
    </div >
  )
}

export default DefaultLayout
