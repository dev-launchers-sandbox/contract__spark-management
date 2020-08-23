import React from "react"
import ManageCodesPage from "../components/modules/ManageCodesPage/ManageCodesPage.js"
import Footer from "../components/common/Footer/Footer.js"
import Header from "../components/common/Header/Header.js"



function ManageCodesRoute(){
  return(
    <div>
      <Header />
      <ManageCodesPage />
      <Footer />
    </div>
  )
}


export default ManageCodesRoute
