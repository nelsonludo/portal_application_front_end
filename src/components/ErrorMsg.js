import React, { useEffect } from "react";
import "../css/errorMsg.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const ErrorMsg = ({ errorMsg }) => {
  return (
    <div className="errContainer">
      <div
        className={
          errorMsg?.display
            ? errorMsg?.good
              ? "errorMsg errorMsg-show good"
              : "errorMsg errorMsg-show"
            : "errorMsg errorMsg-hide"
        }
      >
        <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
        <h6>{errorMsg?.msg}</h6>
      </div>
    </div>
  );
};

export default ErrorMsg;
