import React from "react"
import LoginPage from "../components/modules/LoginPage/LoginPage.js"
import Footer from "../components/common/Footer/Footer.js"
import usePageView from "../utils/usePageView"



function LoginPageRoute(){
  usePageView()
  return(
    <div>
      <LoginPage />
      <Footer />
    </div>
  )
}


export default LoginPageRoute
