import React from 'react';

const ShowCounter = ({ counter, onHelp }) => {
  console.log("ShowCounter re-render");
  return <div>{counter}</div>;
};

export default React.memo(ShowCounter);