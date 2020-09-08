import ReactGA from "react-ga";

const GAevent = (categoryName, eventName) => {
  console.log("SENT");
  ReactGA.event({
    category: categoryName, // Required
    action: eventName, // Required
    label: "labelName",
    value: 100,
    code: "code",
  });
};

export default GAevent;
