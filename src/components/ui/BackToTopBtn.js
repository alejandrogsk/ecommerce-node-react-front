import * as React from "react";
import { Zoom, useScrollTrigger } from "@material-ui/core";
const style = {
  position: `fixed`,
  bottom: `20px`,
  right: `10px`,
  zIndex: `99`
};
const BackToTopBtn = ({ children }) => {
  const trigger = useScrollTrigger();
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return (
    <Zoom in={trigger} >
      <div onClick={handleClick} role="presentation" style={style}>
        {children}
      </div>
    </Zoom>
  );
};
export default BackToTopBtn;
