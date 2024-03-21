import React, { useEffect } from "react";
import "../css/errorMsg.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const ErrorMsg = ({ errorMsg }) => {
  return (
    <div
      className={
        errorMsg?.display
          ? errorMsg?.good
            ? "errorMsg errorMsg-show good"
            : "errorMsg errorMsg-show"
          : "errorMsg errorMsg-hide"
      }
    >
      {errorMsg?.good ? (
        <FontAwesomeIcon icon={faCircleCheck} size="2x" />
      ) : (
        <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
      )}
      <h6>{errorMsg?.msg}</h6>
    </div>
  );
};

export default ErrorMsg;
