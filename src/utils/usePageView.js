import React, {useEffect} from "react"
import ReactGA from "react-ga"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Redirect,
  useLocation
} from "react-router-dom";

function usePageViews() {
  console.log("yo is this working bruh?")
  //gets the current url
  let location = useLocation()

  //when component mounts send which page it is to google analytics
  useEffect(
    () => {
      ReactGA.pageview(location.pathname + location.search);
      console.log("Google Analytics Page: ", location.pathname + location.search)
    },
    []
  )
}

export default usePageViews