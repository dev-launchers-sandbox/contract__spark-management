import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";


//gets called when the user inputs the wrong username and password
const notify = (text) => {
  toast(text, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2500,
    className: css({
      background: "white",
    }),
    bodyClassName: css({
      fontSize: "20px",
      color: "black",
    }),
    progressClassName: css({
      background: "repeating-radial-gradient( transparent, transparent )",
    }),
  });
};

export default notify;
