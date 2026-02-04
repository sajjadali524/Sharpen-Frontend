import React from 'react';
import Child from './Child';
import parentChild from '../../context/ParentChildContext';

const Parent = () => {
    const name = "sajjad";
  return (
    <>
        <div>Parent</div>
        <parentChild.Provider value={name}>
            <Child />
        </parentChild.Provider>
    </>
  )
}

export default Parent;