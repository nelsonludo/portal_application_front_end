import React from "react";
// import { CircularProgress } from '@mui/material';
import "../css/loading.css";

const Loading = () => {
  return (
    <div className="loadingWrapper" style={{ display: "flex" }}>
      {/* <CircularProgress
        style={{
          color: 'var(--orange)',
        }}
      /> */}
      <h1>LOADING ....</h1>
    </div>
  );
};

export default Loading;
