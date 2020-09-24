import ReactGA from "react-ga"


/**
 * Event - Add custom tracking event.
 * @param {string} category
 * @param {string} action
 * @param {string} label
 */
 const sendEvent = (category, action, label) => {
   console.log("event has been fired")
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
};

export default sendEvent;
