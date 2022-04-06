import React from "react";
import "./Styles/popup.css";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

function Popup(props) {
  return props.trigger ? (
    <div className="bodyWrap bodyPopupWrap">
      <div className="popup">
        <div className="popup-inner">
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            <HighlightOffRoundedIcon />
          </button>
          {props.children}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
