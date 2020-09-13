import ReactGA from "react-ga"


/**
 * Event - Add custom tracking event.
 * @param {string} category
 * @param {string} action
 * @param {string} label
 */
 const reactgaevent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
};

export default reactgaevent;
